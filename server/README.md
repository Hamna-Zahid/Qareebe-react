# Qareebe Backend API

Backend API for Qareebe - Hyperlocal Fashion E-commerce Platform

## Features

- JWT Authentication
- User Management
- Shop & Product Management
- Order Processing
- Address Management
- Search & Filtering

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/qareebe
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Seeding Database

```bash
npm run seed
```

This will create sample:
- Users (customer & shop owner)
- Shops
- Products

**Test Credentials:**
- Customer: `+923001234567` / `password123`
- Shop Owner: `+923009876543` / `password123`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Shops
- `GET /api/shops` - Get all shops (supports search)
- `GET /api/shops/:id` - Get shop details
- `GET /api/shops/:id/products` - Get shop products

### Products
- `GET /api/products` - Get all products (supports search)
- `GET /api/products/popular` - Get popular products
- `GET /api/products/:id` - Get product details

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/user/:userId` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)

### Addresses
- `GET /api/addresses/user/:userId` - Get user addresses (protected)
- `POST /api/addresses` - Add address (protected)
- `DELETE /api/addresses/:id` - Delete address (protected)

## Project Structure

```
server/
├── models/          # Mongoose models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── scripts/         # Utility scripts
├── index.js         # Main server file
└── package.json
```

## License

ISC
