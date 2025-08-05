import { Router, Request, Response } from 'express';
import { flightStorage } from '../services/FlightStorage';
import { CreateFlightRequest, RefreshFlightsResponse } from '../types/flight';

const router = Router();

// POST /flights - Create a new tracking reference
router.post('/', (req: Request, res: Response) => {
  try {
    const { flightNumber }: CreateFlightRequest = req.body;

    // Validation
    if (
      !flightNumber ||
      typeof flightNumber !== 'string' ||
      flightNumber.trim().length === 0
    ) {
      return res.status(400).json({
        error: 'Flight number is required and must be a non-empty string',
      });
    }

    // Check if flight number already exists
    const existingFlights = flightStorage.getAllFlights();
    const existingFlight = existingFlights.find(
      (f) => f.flightNumber === flightNumber.trim(),
    );

    if (existingFlight) {
      return res.status(409).json({
        error: `Flight ${flightNumber} is already being tracked`,
        existingFlight,
      });
    }

    // Create new flight tracking
    const newFlight = flightStorage.createFlight(flightNumber.trim());

    return res.status(201).json({
      message: `Flight ${flightNumber} is now being tracked`,
      flight: newFlight,
    });
  } catch (error) {
    console.error('Error creating flight:', error);
    return res.status(500).json({
      error: 'Internal server error while creating flight tracking',
    });
  }
});

// GET /flights - Return all currently tracked flights
router.get('/', (req: Request, res: Response) => {
  try {
    const flights = flightStorage.getAllFlights();
    const stats = flightStorage.getStats();

    res.status(200).json({
      flights,
      stats,
      count: flights.length,
    });
  } catch (error) {
    console.error('Error retrieving flights:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving flights',
    });
  }
});

// DELETE /flights/:id - Remove a flight by ID
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validation
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        error: 'Flight ID is required',
      });
    }

    // Check if flight exists
    const existingFlight = flightStorage.getFlightById(id);
    if (!existingFlight) {
      return res.status(404).json({
        error: `Flight with ID ${id} not found`,
      });
    }

    // Delete the flight
    const deleted = flightStorage.deleteFlight(id);

    if (deleted) {
      return res.status(200).json({
        message: `Flight ${existingFlight.flightNumber} (${id}) has been removed from tracking`,
        deletedFlight: existingFlight,
      });
    } else {
      return res.status(500).json({
        error: 'Failed to delete flight',
      });
    }
  } catch (error) {
    console.error('Error deleting flight:', error);
    return res.status(500).json({
      error: 'Internal server error while deleting flight',
    });
  }
});

// POST /flights/refresh - Refresh statuses for all tracked flights
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { provider } = req.body;
    const useFlightAware = provider !== 'flightstats'; // Default to FlightAware

    const flights = flightStorage.getAllFlights();

    if (flights.length === 0) {
      return res.status(200).json({
        message: 'No flights to refresh',
        updatedCount: 0,
        totalFlights: 0,
      });
    }

    // Refresh all flights
    const result = await flightStorage.refreshAllFlights(useFlightAware);

    const response: RefreshFlightsResponse = {
      message: `Refreshed ${result.totalFlights} flights using ${
        useFlightAware ? 'FlightAware' : 'FlightStats'
      } provider. ${result.updatedCount} flights were updated.`,
      updatedCount: result.updatedCount,
      totalFlights: result.totalFlights,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error refreshing flights:', error);
    return res.status(500).json({
      error: 'Internal server error while refreshing flights',
    });
  }
});

// GET /flights/stats - Get flight tracking statistics
router.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = flightStorage.getStats();

    res.status(200).json({
      stats,
      message: 'Flight tracking statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving flight stats:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving flight statistics',
    });
  }
});

export default router;
