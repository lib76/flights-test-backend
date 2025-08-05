import { FlightStatusResponse } from '../types/flight';

export async function getStatus(
  flightNumber: string,
): Promise<FlightStatusResponse> {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500),
  );

  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    return {
      error: `FlightAware: Unable to retrieve status for flight ${flightNumber}`,
    };
  }

  // Simulate different flight statuses based on flight number
  const flightNumberHash = flightNumber
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const statusType = flightNumberHash % 3;

  const now = new Date();
  const baseTime = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago

  switch (statusType) {
  case 0: {
    // FlightStatus.AWAITING
    return {
      actualDepartureTime: null,
      actualArrivalTime: null,
    };
  }

  case 1: {
    // FlightStatus.DEPARTED
    const departureTime = new Date(
      baseTime.getTime() + Math.random() * 60 * 60 * 1000,
    );
    return {
      actualDepartureTime: departureTime.toISOString(),
      actualArrivalTime: null,
    };
  }

  case 2: {
    // FlightStatus.ARRIVED
    const departureTime2 = new Date(
      baseTime.getTime() + Math.random() * 30 * 60 * 1000,
    );
    const arrivalTime = new Date(
      departureTime2.getTime() + (2 + Math.random() * 3) * 60 * 60 * 1000,
    );
    return {
      actualDepartureTime: departureTime2.toISOString(),
      actualArrivalTime: arrivalTime.toISOString(),
    };
  }

  default:
    return {
      actualDepartureTime: null,
      actualArrivalTime: null,
    };
  }
}
