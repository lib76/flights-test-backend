import { Router, Request, Response } from 'express';

// Import route modules
import flightRoutes from './flights';

const router = Router();

// Mount routes
router.use('/flights', flightRoutes);

// API info endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Flights Test Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/',
      flights: '/flights',
    },
  });
});

export default router;
