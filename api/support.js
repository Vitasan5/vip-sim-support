export default async function handler(req, res) {
  // Разрешаем только ваш домен
  res.setHeader('Access-Control-Allow-Origin', 'https://www.vip-sim.ru');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId } = req.body || {};

  if (!clientId || typeof clientId !== 'string' || !clientId.startsWith('VIP-')) {
    return res.status(400).json({ error: 'Invalid clientId format' });
  }

  // ТВОЙ Google Apps Script URL ↓
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwuUJtiAD-mlnd3hmuCrXrPLacfKldw4BC2aFdKN_-3zwRjZD5w3Mx2BcUxbjRMXqgT4g/exec';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Support system unavailable' });
  }
}
