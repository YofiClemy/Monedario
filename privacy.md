---
layout: none
title: Privacy
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Monedario – Privacy</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Privacy policy for Monedario – Money Calendar.">
  <link rel="icon" href="{{ '/assets/favicon-32.png' | relative_url }}" type="image/png">
  <style>
    :root {
      --bg: #050816;
      --bg-soft: #0b1020;
      --fg: #f5f5f7;
      --muted: #9ca3af;
      --brand: #38bdf8;
      --radius-xl: 24px;
      --radius-m: 14px;
      --border-subtle: rgba(148, 163, 253, 0.14);
      --shadow-soft: 0 18px 70px rgba(15, 23, 42, 0.7);
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, -apple-system, system-ui, -apple-system, system-ui, -apple-system, system-ui, sans-serif;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 24px 16px 40px;
      background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.04), transparent),
                  radial-gradient(circle at top right, rgba(129, 140, 248, 0.06), transparent),
                  #020817;
      color: var(--fg);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
    }
    .shell {
      max-width: 960px;
      margin: 0 auto;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 32px;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--fg);
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    .brand img {
      width: 24px;
      height: 24px;
      border-radius: 7px;
    }
    .pill {
      padding: 4px 9px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 253, 0.22);
      font-size: 11px;
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    main {
      background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.03), transparent),
                  rgba(2, 6, 23, 0.98);
      border-radius: var(--radius-xl);
      padding: 26px 22px 26px;
      border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-soft);
    }
    h1 {
      font-size: 24px;
      margin: 0 0 10px;
      letter-spacing: -0.02em;
    }
    p {
      margin: 0 0 10px;
      font-size: 14px;
      color: var(--muted);
    }
    ul {
      margin: 8px 0 0;
      padding-left: 18px;
      font-size: 14px;
      color: var(--fg);
    }
    li {
      margin-bottom: 6px;
    }
    a {
      color: var(--brand);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="shell">
    <header class="nav">
      <a href="{{ '/' | relative_url }}" class="brand" aria-label="Monedario home">
        <img src="{{ '/assets/app-icon.png' | relative_url }}" alt="">
        <span>Monedario</span>
      </a>
      <span class="pill">
        Privacy-first
      </span>
    </header>

    <main>
      <h1>Privacy</h1>
      <p>Monedario is designed to keep your financial information under your control.</p>
      <ul>
        <li><strong>No outside connections:</strong> The app does not send your financial data to third-party servers.</li>
        <li><strong>Local by default:</strong> Your data is stored locally on your device.</li>
        <li><strong>Optional sync:</strong> iCloud/CloudKit sync is optional and uses your Apple ID infrastructure.</li>
        <li><strong>Data export:</strong> You can export your data at any time to back it up or move it elsewhere.</li>
        <li><strong>Local cleanup:</strong> You can delete local statistics and reset insights from within the app.</li>
        <li><strong>Diagnostics:</strong> TestFlight and the App Store may collect anonymized crash logs and usage diagnostics according to Apple's policies.</li>
      </ul>
      <p style="margin-top:14px;font-size:12px;color:var(--muted);">
        If you have privacy questions or requests, please reach out via
        <a href="mailto:monedario.app@proton.me">monedario.app@proton.me</a>
        or open an issue on GitHub.
      </p>
    </main>
  </div>
</body>
</html>
