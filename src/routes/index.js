const express = require('express');
const router = express.Router();

// Import route modules
const exampleRoutes = require('./example');

// Mount routes
router.use('/example', exampleRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Flights Test Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      example: '/api/example',
    },
  });
});

module.exports = router;
