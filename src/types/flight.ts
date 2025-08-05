export enum FlightStatus {
  AWAITING = 'AWAITING',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
}

export interface Flight {
  id: string; // UUID
  flightNumber: string;
  status: FlightStatus;
  actualDepartureTime: string | null;
  actualArrivalTime: string | null;
}

export interface FlightStatusData {
  actualDepartureTime: string | null;
  actualArrivalTime: string | null;
}

export interface FlightStatusError {
  error: string;
}

export type FlightStatusResponse = FlightStatusData | FlightStatusError;

export interface CreateFlightRequest {
  flightNumber: string;
}

export interface RefreshFlightsResponse {
  message: string;
  updatedCount: number;
  totalFlights: number;
}
