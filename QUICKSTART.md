# Quick Start Guide

## Starting the Backend

### Option 1: With MongoDB Installed

1. Start MongoDB:
```bash
mongod
```

2. Seed the database (first time only):
```bash
cd server
npm run seed
```

3. Start the backend:
```bash
cd server
npm run dev
```

### Option 2: Without MongoDB (Cloud Database)

If you don't have MongoDB installed locally, you can use MongoDB Atlas (free):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/qareebe
```

6. Seed and start:
```bash
cd server
npm run seed
npm run dev
```

## Starting the Frontend

```bash
npm run dev
```

Visit: `http://localhost:5173`

## Test Credentials

After seeding:
- Phone: `+923001234567`
- Password: `password123`

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running (`mongod`)
- OR use MongoDB Atlas (see Option 2 above)

### "API calls failing"
- Make sure backend is running on port 5000
- Check `.env` file has `VITE_API_URL=http://localhost:5000/api`

### "Login/Signup not working"
- Check browser console for errors
- Verify backend is running
- Try test credentials above
