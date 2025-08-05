# AI Prompts Used in Development

This file documents all AI prompts used during the development of this flights tracking backend application.

## Development Prompts

### 1. Express Server with TypeScript Boilerplate

Create a boilerplate Express server with TypeScript that includes:

- Express.js setup with proper TypeScript configuration
- Basic middleware setup (cors, json, urlencoded)
- Error handling middleware
- Basic health check endpoint
- Proper TypeScript types and interfaces
- Package.json with necessary dependencies
- tsconfig.json configuration
- nodemon configuration for development

---

### 2. VS Code Debugger Configuration

Create a basic launch.json file for debugging an Express TypeScript application

---

### 3. Flight Tracking System Implementation

````
Create a flight tracking system with the following requirements:

1. In-memory storage for tracked flights with this structure:
```typescript
{
  id: string; // UUID
  flightNumber: string;
  status: 'AWAITING' | 'DEPARTED' | 'ARRIVED';
  actualDepartureTime: string | null;
  actualArrivalTime: string | null;
}
````

2. Express routes:

- POST /flights - Create new tracking reference (status: AWAITING)
- GET /flights - Return all currently tracked flights
- DELETE /flights/:id - Remove flight by ID
- POST /flights/refresh - Refresh statuses for all tracked flights

3. Two mock service providers:

- services/FlightAwareProvider.ts
- services/FlightStatsProvider.ts

Each provider should export:

```typescript
getStatus(flightNumber: string): Promise<{ actualDepartureTime: string | null; actualArrivalTime: string | null } | { error: string }>
```

Include proper error handling, validation, and TypeScript types throughout.
