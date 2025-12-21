# Qareebe - Hyperlocal Fashion E-commerce

A modern, full-stack e-commerce platform for hyperlocal fashion shopping built with React and Node.js.

## Features

### Customer App
- 🛍️ Browse local shops and products
- 🔍 Intelligent search functionality
- 🛒 Shopping cart with real-time updates
- 👤 User authentication (signup/login)
- 📦 Order management
- 📍 Multiple delivery addresses
- ⚙️ User settings and preferences

### Backend API
- 🔐 JWT-based authentication
- 📊 MongoDB database
- 🏪 Shop management
- 📦 Product catalog
- 🛒 Order processing
- 📍 Address management

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS v4
- React Router v6
- Context API for state management
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Qareebe-react
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Configure environment variables

**Frontend** (`.env` in root):
```
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/qareebe
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Running the Application

1. Start MongoDB (if running locally)
```bash
mongod
```

2. Seed the database (first time only)
```bash
cd server
npm run seed
```

3. Start the backend server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

4. Start the frontend (in a new terminal)
```bash
npm run dev
```
App will run on `http://localhost:5173`

## Test Credentials

After seeding the database:
- **Customer**: `+923001234567` / `password123`
- **Shop Owner**: `+923009876543` / `password123`

## Project Structure

```
Qareebe-react/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context providers
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── data/            # Mock data (legacy)
│   └── App.jsx          # Main app component
├── server/
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── scripts/         # Utility scripts
│   └── index.js         # Server entry point
└── public/              # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id` - Get shop details
- `GET /api/shops/:id/products` - Get shop products

### Products
- `GET /api/products` - Get all products
- `GET /api/products/popular` - Get popular products
- `GET /api/products/:id` - Get product details

### Orders (Protected)
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get order details

### Addresses (Protected)
- `GET /api/addresses/user/:userId` - Get user addresses
- `POST /api/addresses` - Add address
- `DELETE /api/addresses/:id` - Delete address

## Development

### Frontend Development
```bash
npm run dev
```

### Backend Development
```bash
cd server
npm run dev
```

### Build for Production
```bash
npm run build
```

## Deployment

### Frontend
- Build the app: `npm run build`
- Deploy `dist/` folder to Vercel, Netlify, or any static hosting
- Update `VITE_API_URL` to production backend URL

### Backend
- Deploy to Heroku, Railway, or Render
- Set up MongoDB Atlas for production database
- Configure environment variables on hosting platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Contact

For questions or support, please open an issue in the repository.
