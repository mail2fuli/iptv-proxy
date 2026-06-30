export default async function handler(req, res) {
const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const targetUrl = parsedUrl.searchParams.get('url');

  if (!targetUrl) {
    return res.status(400).send("No url provided. Use ?url=YOUR_LINK");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Origin': 'https://toffeelive.com',
        'Referer': 'https://toffeelive.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const arrayBuffer = await response.arrayBuffer();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/vnd.apple.mpegurl');

    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).send("Error fetching stream");
  }
}
