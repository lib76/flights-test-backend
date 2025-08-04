# Flights Test Backend

A modern, production-ready Express.js backend built with TypeScript for the Flights Test App with best practices, security middleware, and a clean project structure.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
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
│   │   └── example.ts      # Example routes
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

- `GET /api` - API information and available endpoints

### Example Routes

- `GET /api/example` - Get all examples
- `GET /api/example/:id` - Get example by ID
- `POST /api/example` - Create new example
- `PUT /api/example/:id` - Update example
- `DELETE /api/example/:id` - Delete example

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Database Configuration (if using MongoDB)
MONGODB_URI=mongodb://localhost:27017/your-database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

## 🧪 Testing

The boilerplate includes Jest for testing. Create test files in a `__tests__` directory or with `.test.js` extension.

Example test:

```javascript
const request = require("supertest");
const app = require("../src/app");

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

## 📝 Adding New Routes

1. Create a new route file in `src/routes/`
2. Export the router
3. Import and mount in `src/routes/index.js`

Example:

```javascript
// src/routes/users.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Users endpoint" });
});

module.exports = router;
```

Then in `src/routes/index.js`:

```javascript
const userRoutes = require("./users");
router.use("/users", userRoutes);
```

## 🚀 Deployment

### Production Build

```bash
npm start
```

### Environment Variables

Make sure to set all required environment variables in your production environment.

### Process Manager (PM2)

```bash
npm install -g pm2
pm2 start src/app.js --name "flights-test-backend"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or issues, please open an issue on GitHub.
