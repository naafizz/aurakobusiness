import { kv } from '@vercel/kv';

const KEY = 'aurako-business-data';

export default async function handler(req, res) {
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
