// Core imports
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const cors = require('cors');

// Load environment variables
//dotenv.config();

// App initialization
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI, "MONGO URI")

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 TODO API is running...');
});

// TODO Routes (example, plug in actual routes later)
const todoRoutes = require('./routes/todo.routes');
app.use('/api/todos', todoRoutes);

// User Routes
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);


// Connect to MongoDB and start server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🔥 Server running at http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

