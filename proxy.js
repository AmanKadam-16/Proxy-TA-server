require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files (for handling images)
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send('Dynamic CORS Proxy Server is Running!');
});

// Dynamic target URL selection
const getTargetUrl = (path) => {
  if (path.startsWith('/TA')) return process.env.TA_BASE_URL;
  if (path.startsWith('/RIT-API-Test')) return process.env.RIT_API_TEST_URL;
  if (path.startsWith('/RIT-API')) return process.env.RIT_API_URL;
  if (path.startsWith('/RIT')) return process.env.RIT_BASE_URL;
  return process.env.DEFAULT_TARGET_URL; // Fallback target if no match
};

// Proxy middleware
app.use(
  '/',
  createProxyMiddleware({
    target: '', // Will be dynamically set
    changeOrigin: true,
    router: (req) => getTargetUrl(req.path), // Dynamically determine target
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Origin', getTargetUrl(req.path)); // Set the origin header dynamically
    },
  })
);

module.exports = app;
