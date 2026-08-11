import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  try {
    const { username, password } = req.body || {};
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const SECRET = process.env.AUTH_SECRET;

    if (!ADMIN_USER || !ADMIN_PASS || !SECRET) {
      res.status(500).json({ error: 'server not configured — set ADMIN_USER, ADMIN_PASS, AUTH_SECRET in Vercel env vars' });
      return;
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      res.status(401).json({ error: 'invalid credentials' });
      return;
    }

    // 30-day signed session token — no password stored inside it
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url');
    const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
    res.status(200).json({ token: `${payload}.${sig}` });
  } catch (e) {
    res.status(500).json({ error: 'login failed', detail: String(e) });
  }
}
