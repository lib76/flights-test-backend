# Flights Test Backend

A modern, production-ready Express.js backend built with TypeScript for the Flights Test App with comprehensive flight tracking capabilities, multiple provider integration, and a clean project structure.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Flight Tracking**: Complete flight tracking system with status management
- **Multi-Provider Integration**: FlightAware and FlightStats provider support
- **Real-time Status Updates**: AWAITING, DEPARTED, ARRIVED status tracking
- **Security**: Helmet, CORS, Rate Limiting
- **Performance**: Compression middleware
- **Logging**: Morgan HTTP request logger
- **Error Handling**: Comprehensive error handling middleware
- **Environment**: Environment variable management with dotenv
- **Linting**: ESLint configuration with TypeScript rules
- **Development**: Hot reload with nodemon and ts-node

## 📁 Project Structure

```
├── src/
│   ├── app.ts              # Main application file
│   ├── routes/
│   │   ├── index.ts        # Main router
│   │   └── flights.ts      # Flight tracking routes
│   ├── services/
│   │   ├── FlightStorage.ts        # Flight data persistence
│   │   ├── FlightAwareProvider.ts  # FlightAware integration
│   │   └── FlightStatsProvider.ts  # FlightStats integration
│   ├── types/
│   │   └── flight.ts       # Flight-related type definitions
│   └── middleware/
│       └── errorHandler.ts # Error handling middleware
├── dist/                   # Compiled JavaScript output
├── package.json
├── tsconfig.json           # TypeScript configuration
├── .env.example
├── .gitignore
└── README.md
```

## 🛠️ Installation

1. **Clone or download this boilerplate**

   ```bash
   git clone <your-repo-url>
   cd flights-test-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires build)
- `npm run dev` - Start development server with hot reload

- `npm run lint` - Run ESLint with TypeScript support
- `npm run lint:fix` - Fix ESLint issues
- `npm run clean` - Remove compiled files

## 🌐 API Endpoints

### Health Check

- `GET /health` - Server health status

### API Info

- `GET /` - API information and available endpoints

### Flight Tracking Routes

- `GET /flights` - Get all tracked flights
- `POST /flights` - Create new flight tracking
- `GET /flights/:id` - Get specific flight tracking
- `DELETE /flights/:id` - Delete flight tracking
- `PUT /flights/:id/refresh` - Refresh flight status
- `POST /flights/refresh-all` - Refresh all flight statuses

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Flight Providers (Mock Configuration)
FLIGHT_AWARE_ENABLED=true
FLIGHT_STATS_ENABLED=true
```

## 🧪 Testing

The project uses TypeScript with ESLint for code quality. Create test files in a `__tests__` directory or with `.test.ts` extension when testing is added.

Example test structure:

```typescript
import request from "supertest";
import app from "../src/app";

describe("Health Check", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
  });
});
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **Input Validation**: Request body validation
- **Error Handling**: Secure error responses

## ✈️ Flight Tracking System

### Features

- **Multi-Provider Integration**: Supports FlightAware and FlightStats providers
- **Real-time Status Updates**: Tracks flight status (AWAITING, DEPARTED, ARRIVED)
- **Flight Validation**: Validates flight number format
- **Concurrent Updates**: Refreshes multiple flights simultaneously
- **Error Handling**: Graceful handling of provider failures

### Flight Status Logic

- **AWAITING**: Flight has not departed yet
- **DEPARTED**: Flight has departed but not arrived
- **ARRIVED**: Flight has completed its journey

### Supported Flight Numbers

The system includes mock data for these flight numbers:

- AA123, UA456, DL789, BA101

### Provider Integration

- **FlightAware Provider**: Simulates FlightAware API responses
- **FlightStats Provider**: Simulates FlightStats API responses
- **Fallback Logic**: Uses alternative provider if one fails

## 📝 Adding New Routes

1. Create a new route file in `src/routes/`
2. Export the router
3. Import and mount in `src/routes/index.ts`

Example:

```typescript
// src/routes/users.ts
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Users endpoint" });
});

export default router;
```

Then in `src/routes/index.ts`:

```typescript
import userRoutes from "./users";
router.use("/users", userRoutes);
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Make sure to set all required environment variables in your production environment.
