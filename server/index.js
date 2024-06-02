const mongoose = require('mongoose');
const cors = require('cors');
const express =require('express');
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();

// MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());


// ROUTES
const userRoutes = require('./routes/route')
app.use('/api/users', userRoutes)


// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL, {

  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// SERVER
const port = 8000;
app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})