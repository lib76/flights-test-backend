import { FlightStatusResponse } from '../types/flight';

export async function getStatus(
  flightNumber: string,
): Promise<FlightStatusResponse> {
  // Simulate network delay (slightly different timing than FlightAware)
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 800 + 300),
  );

  // Simulate occasional errors (15% chance - higher than FlightAware)
  if (Math.random() < 0.15) {
    return {
      error: `FlightStats: Service temporarily unavailable for flight ${flightNumber}`,
    };
  }

  // Different algorithm for status determination
  const flightNumberSum = flightNumber.split('').reduce((acc, char) => {
    const code = char.charCodeAt(0);
    return acc + (code >= 48 && code <= 57 ? parseInt(char) : code);
  }, 0);

  const statusType = flightNumberSum % 4; // 4 different states

  const now = new Date();
  const baseTime = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago

  switch (statusType) {
  case 0: {
    // FlightStatus.AWAITING
    return {
      actualDepartureTime: null,
      actualArrivalTime: null,
    };
  }

  case 1: {
    // FlightStatus.DEPARTED (recently)
    const departureTime = new Date(
      baseTime.getTime() + Math.random() * 45 * 60 * 1000,
    );
    return {
      actualDepartureTime: departureTime.toISOString(),
      actualArrivalTime: null,
    };
  }

  case 2: {
    // FlightStatus.ARRIVED (short flight)
    const departureTime2 = new Date(
      baseTime.getTime() + Math.random() * 20 * 60 * 1000,
    );
    const arrivalTime = new Date(
      departureTime2.getTime() + (1 + Math.random() * 2) * 60 * 60 * 1000,
    );
    return {
      actualDepartureTime: departureTime2.toISOString(),
      actualArrivalTime: arrivalTime.toISOString(),
    };
  }

  case 3: {
    // FlightStatus.ARRIVED (long flight)
    const departureTime3 = new Date(
      baseTime.getTime() + Math.random() * 15 * 60 * 1000,
    );
    const arrivalTime2 = new Date(
      departureTime3.getTime() + (4 + Math.random() * 4) * 60 * 60 * 1000,
    );
    return {
      actualDepartureTime: departureTime3.toISOString(),
      actualArrivalTime: arrivalTime2.toISOString(),
    };
  }

  default:
    return {
      actualDepartureTime: null,
      actualArrivalTime: null,
    };
  }
}
