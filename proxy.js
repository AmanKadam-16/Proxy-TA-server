const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const TARGET_URL = 'http://4.188.255.22:8085/';

// Enable CORS for all routes
app.use(cors());

// Serve static files (for handling images)
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send('CORS Proxy Server is Running!');
});

// Proxy middleware
app.use(
  '/apidata',
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    pathRewrite: { '^/apidata': '' }, // Remove /api prefix before forwarding
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Origin', TARGET_URL); // Set the origin header
    },
  })
);

module.exports = app;