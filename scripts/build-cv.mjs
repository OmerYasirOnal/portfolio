#!/usr/bin/env node
/**
 * build-cv.mjs — generate the two CV PDFs from the built site.
 *
 * 1. `pnpm build` so `dist/cv-print/{en,tr}/index.html` exist.
 * 2. Print each built page to `public/cv/omer-yasir-onal-<lang>.pdf` via headless
 *    Brave, driven over the DevTools Protocol (CDP).
 *
 * Why CDP instead of `--print-to-pdf`: on this machine (Brave 149) both
 * `--headless=new --print-to-pdf` and `--headless --print-to-pdf` hang
 * indefinitely and never emit a file (verified 2026-07-01). Driving
 * `Page.printToPDF` over the remote-debugging port is deterministic, honours the
 * CSS `@page { size: A4; margin: 14mm }` via `preferCSSPageSize`, and prints the
 * violet accent/rules via `printBackground`. Real, selectable text — never an
 * image. The PDFs are committed as static assets so they serve on Vercel with no
 * browser at build time.
 */
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const BRAVE = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const LOCALES = ['en', 'tr'];
const OUT_DIR = join(repoRoot, 'public', 'cv');

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Minimal CDP client over a single WebSocket. */
function cdp(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const waiters = [];
  let seq = 0;
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
      for (let i = waiters.length - 1; i >= 0; i--) {
        if (waiters[i].method === msg.method) {
          waiters[i].resolve(msg.params);
          waiters.splice(i, 1);
        }
      }
    }
  };
  const ready = new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });
  return {
    ready,
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++seq;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      }),
    once: (method, timeoutMs) =>
      new Promise((resolve, reject) => {
        const w = { method, resolve };
        waiters.push(w);
        setTimeout(() => {
          const i = waiters.indexOf(w);
          if (i >= 0) {
            waiters.splice(i, 1);
            reject(new Error(`timeout waiting for ${method}`));
          }
        }, timeoutMs);
      }),
    close: () => ws.close(),
  };
}

async function launchBrave(profileDir) {
  const proc = spawn(
    BRAVE,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  // Chromium writes the chosen port to <profile>/DevToolsActivePort.
  const portFile = join(profileDir, 'DevToolsActivePort');
  let port;
  for (let i = 0; i < 80; i++) {
    if (existsSync(portFile)) {
      port = readFileSync(portFile, 'utf8').split('\n')[0].trim();
      if (port) break;
    }
    await sleep(125);
  }
  if (!port) throw new Error('Brave did not expose a DevTools port');
  // Confirm the HTTP endpoint answers before driving it.
  for (let i = 0; i < 40; i++) {
    try {
      await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
      break;
    } catch {
      await sleep(125);
    }
  }
  return { proc, port };
}

async function printPdf(port, lang) {
  const out = join(OUT_DIR, `omer-yasir-onal-${lang}.pdf`);
  const src = `file://${join(repoRoot, 'dist', 'cv-print', lang, 'index.html')}`;
  const target = await (
    await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
  ).json();
  const client = cdp(target.webSocketDebuggerUrl);
  await client.ready;
  try {
    await client.send('Page.enable');
    const loaded = client.once('Page.loadEventFired', 30_000);
    await client.send('Page.navigate', { url: src });
    await loaded;
    await sleep(300); // let fonts/layout settle
    const { data } = await client.send('Page.printToPDF', {
      printBackground: true,
      preferCSSPageSize: true,
      // Fallbacks used only if the page lacks a CSS @page size:
      paperWidth: 8.27,
      paperHeight: 11.69,
      marginTop: 0.55,
      marginBottom: 0.55,
      marginLeft: 0.55,
      marginRight: 0.55,
    });
    if (existsSync(out)) rmSync(out);
    writeFileSync(out, Buffer.from(data, 'base64'));
  } finally {
    client.close();
    await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`).catch(() => {});
  }
  return existsSync(out) && statSync(out).size > 5_000;
}

async function main() {
  if (!existsSync(BRAVE)) {
    console.error(`Brave not found at: ${BRAVE}`);
    process.exit(1);
  }

  console.log('▶ Building site (pnpm build)…');
  execFileSync('pnpm', ['build'], { stdio: 'inherit', cwd: repoRoot });

  mkdirSync(OUT_DIR, { recursive: true });
  const profileDir = mkdtempSync(join(tmpdir(), 'brave-cv-'));
  const { proc, port } = await launchBrave(profileDir);
  console.log(`▶ Brave headless on DevTools port ${port}`);

  try {
    for (const lang of LOCALES) {
      const built = join(repoRoot, 'dist', 'cv-print', lang, 'index.html');
      if (!existsSync(built)) {
        console.error(`Missing built page: ${built}`);
        process.exit(1);
      }
      console.log(`▶ Printing ${lang.toUpperCase()} → PDF…`);
      if (!(await printPdf(port, lang))) {
        console.error(`Failed to generate a non-trivial PDF for ${lang}`);
        process.exit(1);
      }
    }
  } finally {
    proc.kill('SIGKILL');
    rmSync(profileDir, { recursive: true, force: true });
  }

  console.log('\n✅ CV PDFs generated:');
  for (const lang of LOCALES) {
    const out = join(OUT_DIR, `omer-yasir-onal-${lang}.pdf`);
    console.log(`  ${out}  —  ${kb(statSync(out).size)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
