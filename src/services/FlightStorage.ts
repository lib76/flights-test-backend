import { Flight, FlightStatus, FlightStatusResponse } from '../types/flight';
import { getStatus as getFlightAwareStatus } from './FlightAwareProvider';
import { getStatus as getFlightStatsStatus } from './FlightStatsProvider';

class FlightStorage {
  private flights: Map<string, Flight> = new Map();

  // Generate UUID
  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  // Create a new flight tracking
  createFlight(flightNumber: string): Flight {
    const id = this.generateId();
    const flight: Flight = {
      id,
      flightNumber,
      status: FlightStatus.AWAITING,
      actualDepartureTime: null,
      actualArrivalTime: null,
    };

    this.flights.set(id, flight);
    return flight;
  }

  // Get all tracked flights
  getAllFlights(): Flight[] {
    return Array.from(this.flights.values());
  }

  // Get a specific flight by ID
  getFlightById(id: string): Flight | null {
    return this.flights.get(id) || null;
  }

  // Delete a flight by ID
  deleteFlight(id: string): boolean {
    return this.flights.delete(id);
  }

  // Update flight status based on provider response
  private updateFlightStatus(
    flight: Flight,
    statusResponse: FlightStatusResponse,
  ): Flight {
    if ('error' in statusResponse) {
      // Keep current status if there's an error
      return flight;
    }

    const { actualDepartureTime, actualArrivalTime } = statusResponse;

    // Determine new status based on times
    let newStatus: FlightStatus = FlightStatus.AWAITING;

    if (actualArrivalTime) {
      newStatus = FlightStatus.ARRIVED;
    } else if (actualDepartureTime) {
      newStatus = FlightStatus.DEPARTED;
    }

    const updatedFlight: Flight = {
      ...flight,
      status: newStatus,
      actualDepartureTime,
      actualArrivalTime,
    };

    this.flights.set(flight.id, updatedFlight);
    return updatedFlight;
  }

  // Refresh all flight statuses using a provider
  async refreshAllFlights(
    useFlightAware: boolean = true,
  ): Promise<{ updatedCount: number; totalFlights: number }> {
    const flights = this.getAllFlights();
    let updatedCount = 0;

    // Process flights in parallel with a limit to avoid overwhelming the providers
    const batchSize = 5;
    for (let i = 0; i < flights.length; i += batchSize) {
      const batch = flights.slice(i, i + batchSize);

      const promises = batch.map(async (flight) => {
        try {
          const statusResponse = useFlightAware
            ? await getFlightAwareStatus(flight.flightNumber)
            : await getFlightStatsStatus(flight.flightNumber);

          const updatedFlight = this.updateFlightStatus(flight, statusResponse);

          // Check if status actually changed
          if (
            updatedFlight.status !== flight.status ||
            updatedFlight.actualDepartureTime !== flight.actualDepartureTime ||
            updatedFlight.actualArrivalTime !== flight.actualArrivalTime
          ) {
            updatedCount++;
          }
        } catch (error) {
          console.error(`Error updating flight ${flight.flightNumber}:`, error);
        }
      });

      await Promise.all(promises);

      // Small delay between batches to be respectful to the providers
      if (i + batchSize < flights.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return {
      updatedCount,
      totalFlights: flights.length,
    };
  }

  // Get storage statistics
  getStats(): {
    totalFlights: number;
    awaitingCount: number;
    departedCount: number;
    arrivedCount: number;
    } {
    const flights = this.getAllFlights();
    const stats = {
      totalFlights: flights.length,
      awaitingCount: 0,
      departedCount: 0,
      arrivedCount: 0,
    };

    flights.forEach((flight) => {
      switch (flight.status) {
      case FlightStatus.AWAITING:
        stats.awaitingCount++;
        break;
      case FlightStatus.DEPARTED:
        stats.departedCount++;
        break;
      case FlightStatus.ARRIVED:
        stats.arrivedCount++;
        break;
      }
    });

    return stats;
  }
}

// Export a singleton instance
export const flightStorage = new FlightStorage();
