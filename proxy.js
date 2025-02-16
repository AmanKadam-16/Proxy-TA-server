const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(cors());
// app.use(express.static('public'));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('CORS Proxy Server is Running!');
});

// Configure proxy middleware for each service
const services = [
  { path: '/rit-api', envVar: 'RIT_API_URL' },
  { path: '/rit-test', envVar: 'RIT_API_TEST_URL' },
  { path: '/rit-base', envVar: 'RIT_BASE_URL' },
  { path: '/ta-api', envVar: 'TA_BASE_URL' }
];

services.forEach(({ path, envVar }) => {
  const target = process.env[envVar];
  if (!target) {
    console.warn(`Skipping ${path}: ${envVar} not configured`);
    return;
  }

  console.log(`Creating proxy for ${path} -> ${target}`);

  app.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (reqPath) => {
        // Remove the service path prefix
        const newPath = reqPath.replace(path, '');
        console.log(`Rewriting path: ${reqPath} -> ${newPath}`);
        return newPath || '/';  // Ensure we always have a path
      },
      onProxyReq: (proxyReq, req) => {
        console.log(`Proxying: ${req.method} ${req.originalUrl} -> ${proxyReq.path}`);
      },
      onError: (err, req, res) => {
        console.error(`Proxy error for ${req.originalUrl}:`, err);
        res.status(500).json({ error: 'Proxy error' });
      }
    })
  );
});

// Add route to get environment variables safely
app.get('/config', (req, res) => {
  res.json({
    TA_BASE_URL: process.env.TA_BASE_URL,
    RIT_API_TEST_URL: process.env.RIT_API_TEST_URL,
    RIT_API_URL: process.env.RIT_API_URL,
    RIT_BASE_URL: process.env.RIT_BASE_URL
  });
});

// Update the script in index.html to fetch config
// const html = fs.readFileSync('./public/index.html', 'utf8');
// const updatedHtml = html.replace(
//   'process.env[envVar]',
//   'fetch("/config").then(r => r.json()).then(config => config[envVar])'
// );
// fs.writeFileSync('./public/index.html', updatedHtml);

app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
  console.log('Configured routes:');
  services.forEach(({ path, envVar }) => {
    console.log(`  ${path.padEnd(10)} -> ${process.env[envVar] || 'NOT CONFIGURED'}`);
  });
});