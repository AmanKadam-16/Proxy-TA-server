require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const TARGET_URL = process.env.TARGET_URL; // Use environment variable

// Enable CORS for all routes
app.use(cors());

// Serve static files (for handling images)
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send('CORS Proxy Server is Running!');
});

// Proxy middleware for all routes
app.use(
  '/',
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    // No pathRewrite needed since we are proxying directly to '/'
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Origin', TARGET_URL); // Set the origin header
    },
  })
);

module.exports = app;