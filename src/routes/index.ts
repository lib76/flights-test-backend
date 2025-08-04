import { Router, Request, Response } from 'express';

// Import route modules
import exampleRoutes from './example';

const router = Router();

// Mount routes
router.use('/example', exampleRoutes);

// API info endpoint
router.get('/', (req: Request, res: Response) => {
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

export default router;
