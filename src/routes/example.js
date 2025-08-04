const express = require('express');
const router = express.Router();

// GET /api/example
router.get('/', (req, res) => {
  res.json({
    message: 'Example endpoint working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
  });
});

// GET /api/example/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Example endpoint with ID: ${id}`,
    id,
    timestamp: new Date().toISOString(),
  });
});

// POST /api/example
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required',
    });
  }

  res.status(201).json({
    message: 'Example POST endpoint',
    data: { name, email },
    timestamp: new Date().toISOString(),
  });
});

// PUT /api/example/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  res.json({
    message: `Updated example with ID: ${id}`,
    id,
    data: { name, email },
    timestamp: new Date().toISOString(),
  });
});

// DELETE /api/example/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Deleted example with ID: ${id}`,
    id,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
