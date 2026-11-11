/**
 * Vercel Serverless Function (/api/contact)
 *
 * Receives quote requests from omeryasironal.com and delivers them to the
 * owner's inbox via Resend. Secrets stay server-side:
 *   RESEND_API_KEY     required to send (set in Vercel project env vars)
 *   RESEND_FROM_EMAIL  optional verified sender, e.g. "Site <form@omeryasironal.com>"
 *
 * Without RESEND_API_KEY the endpoint answers 503 { fallback: 'mailto' } and
 * the client opens a prefilled email instead, so no message is lost.
 *
 * Spam protection: honeypot field + minimum fill time (both silently accepted
 * so bots get no signal), strict length limits and input validation.
 * Visitor data is only forwarded to the owner's inbox; nothing is stored.
 */
const TARGET_EMAIL = 'engomeryasironal@gmail.com';
const MIN_FILL_MS = 2500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{10,20}$/;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value, max) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim()
    .slice(0, max);
}

export function validate(body) {
  const name = clean(body.name, 120);
  // Backwards compatible: older form sent `email` (+ optional `phone`).
  const contact = clean(body.contact || body.email || body.phone, 160);
  const service = clean(body.service || body.topic || 'Genel', 80);
  const message = clean(body.message, 3000);
  const page = clean(body.page, 200);

  const isEmail = EMAIL_RE.test(contact);
  const isPhone = !isEmail && PHONE_RE.test(contact);
  const valid = name.length >= 2 && (isEmail || isPhone) && message.length >= 10;
  return { valid, name, contact, isEmail, service, message, page };
}

export function isLikelyBot(body, now = Date.now()) {
  if (String(body.website || '').trim()) return true;
  const started = Number(body.started);
  if (Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS) return true;
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return res.status(400).json({ ok: false, error: 'invalid_json' });
    }
  }

  // Pretend success for bots: no signal to retry.
  if (isLikelyBot(body)) return res.status(200).json({ ok: true });

  const { valid, name, contact, isEmail, service, message, page } = validate(body);
  if (!valid) return res.status(400).json({ ok: false, error: 'invalid_input' });

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'omeryasironal.com <onboarding@resend.dev>';
  if (!apiKey) return res.status(503).json({ ok: false, fallback: 'mailto' });

  const subject = `[omeryasironal.com] ${service} - ${name}`;
  const text = [
    'Yeni teklif talebi (omeryasironal.com)',
    '',
    `Ad / şirket: ${name}`,
    `${isEmail ? 'E-posta' : 'Telefon'}: ${contact}`,
    `Hizmet: ${service}`,
    page ? `Sayfa: ${page}` : null,
    '',
    message,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const contactHtml = isEmail
    ? `<a href="mailto:${escapeHtml(contact)}">${escapeHtml(contact)}</a>`
    : `<a href="https://wa.me/${escapeHtml(contact.replace(/\D/g, ''))}">${escapeHtml(contact)}</a>`;
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#101a16;line-height:1.6">
      <h2 style="margin:0 0 12px">Yeni teklif talebi</h2>
      <p style="margin:4px 0"><strong>Ad / şirket:</strong> ${escapeHtml(name)}</p>
      <p style="margin:4px 0"><strong>${isEmail ? 'E-posta' : 'Telefon'}:</strong> ${contactHtml}</p>
      <p style="margin:4px 0"><strong>Hizmet:</strong> ${escapeHtml(service)}</p>
      ${page ? `<p style="margin:4px 0;color:#4b5a54"><strong>Sayfa:</strong> ${escapeHtml(page)}</p>` : ''}
      <hr style="border:none;border-top:1px solid #dfddd4;margin:16px 0" />
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromAddress,
        to: [TARGET_EMAIL],
        ...(isEmail ? { reply_to: contact } : {}),
        subject,
        text,
        html,
      }),
    });
    if (!response.ok) return res.status(502).json({ ok: false, fallback: 'mailto' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, fallback: 'mailto' });
  }
}
