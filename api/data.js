import { kv } from '@vercel/kv';
import crypto from 'crypto';

const KEY = 'aurako-business-data';

function isValidToken(token) {
  const SECRET = process.env.AUTH_SECRET;
  if (!token || !SECRET) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  if (sig !== expected) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch (e) {
    return false;
  }
}

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!isValidToken(token)) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const data = await kv.get(KEY);
      res.status(200).json(data || null);
    } catch (e) {
      res.status(500).json({ error: 'read failed', detail: String(e) });
    }
    return;
  }
  if (req.method === 'POST') {
    try {
      const body = req.body;
      if (!body || typeof body !== 'object') {
        res.status(400).json({ error: 'invalid body' });
        return;
      }
      await kv.set(KEY, body);
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: 'write failed', detail: String(e) });
    }
    return;
  }
  res.status(405).json({ error: 'method not allowed' });
}
