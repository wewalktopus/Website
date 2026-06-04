export const runtime = 'nodejs';

export async function GET() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Walktopus Loader Preview</title>
    <link rel="icon" href="/favicon.ico" />
    <style>
      :root {
        --bg: #eee9d9;
        --text: #3a3737;
        --accent: #ef4d30;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100svh;
        display: grid;
        place-items: center;
        font-family: "Segoe UI", Arial, sans-serif;
        color: var(--text);
        background: radial-gradient(circle at 22% 18%, rgba(239,77,48,0.14), transparent 42%), linear-gradient(180deg, #f8f4ea 0%, var(--bg) 100%);
      }

      .wrap {
        text-align: center;
        padding: 24px;
      }

      .eyebrow {
        margin: 0;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-size: 12px;
        color: var(--accent);
      }

      .loader {
        margin: 24px auto 0;
        width: 144px;
        height: 144px;
        position: relative;
      }

      .ring {
        position: absolute;
        inset: 0;
        border: 1px solid rgba(239,77,48,0.35);
        border-radius: 9999px;
        animation: spin 3.2s linear infinite;
      }

      .core {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 80px;
        height: 80px;
        transform: translate(-50%, -50%);
        border-radius: 9999px;
        background: #fff;
        display: grid;
        place-items: center;
        box-shadow: 0 10px 30px rgba(58,55,55,0.18);
        animation: pulse 2.2s ease-in-out infinite;
      }

      .core img {
        width: 36px;
        height: 36px;
        object-fit: contain;
      }

      h1 {
        margin: 26px 0 0;
        font-size: clamp(28px, 4.5vw, 42px);
        line-height: 1.15;
      }

      p {
        margin: 10px 0 0;
        color: #6c6661;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0 rgba(239,77,48,0.22); }
        50% { transform: translate(-50%, -50%) scale(1.06); box-shadow: 0 0 0 18px rgba(239,77,48,0); }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <p class="eyebrow">Loader Preview</p>
      <div class="loader" aria-label="Loading">
        <div class="ring"></div>
        <div class="core"><img src="/favicon.ico" alt="Walktopus" /></div>
      </div>
      <h1>Preparing your growth experience</h1>
      <p>Clean favicon-based preview for Services and Solutions route loaders.</p>
    </main>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
