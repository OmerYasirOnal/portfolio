/**
 * Vercel Serverless Function (/api/contact)
 *
 * Receives contact form submissions from omeryasironal.com and delivers them to
 * `engomeryasironal@gmail.com` via Resend (`process.env.RESEND_API_KEY`).
 * If `RESEND_API_KEY` is not yet configured in Vercel environment variables,
 * responds with `{ ok: false, fallback: 'mailto' }` so the client form cleanly
 * triggers its pre-filled mailto fallback without losing the visitor's message.
 */
const TARGET_EMAIL = 'engomeryasironal@gmail.com';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const topic = String(body.topic || 'Genel').trim();
  const message = String(body.message || '').trim();
  const website = String(body.website || '').trim();

  // Honeypot check
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
    return res.status(400).json({ ok: false, error: 'Invalid input fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.RESEND_FROM_EMAIL || 'Ömer Yasir Önal Web <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(503).json({ ok: false, fallback: 'mailto' });
  }

  const subject = `[omeryasironal.com] ${topic} - ${name}`;
  const text = [
    `Yeni İletişim Formu Mesajı (omeryasironal.com)`,
    ``,
    `Ad Soyad: ${name}`,
    `E-posta: ${email}`,
    phone ? `Telefon / WhatsApp: ${phone}` : null,
    `Konu: ${topic}`,
    ``,
    `Mesaj:`,
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">Yeni İletişim Formu Mesajı (omeryasironal.com)</h2>
      <p style="margin: 4px 0;"><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 4px 0;"><strong>E-posta:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      ${phone ? `<p style="margin: 4px 0;"><strong>Telefon / WhatsApp:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p style="margin: 4px 0;"><strong>Konu / Hizmet:</strong> ${escapeHtml(topic)}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [TARGET_EMAIL],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, fallback: 'mailto' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, fallback: 'mailto' });
  }
}
