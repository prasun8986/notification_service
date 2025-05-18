const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// Start Server after DB & RabbitMQ are connected
const startServer = async () => {
  try {
    await connectDB();
    await connectRabbitMQ();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
