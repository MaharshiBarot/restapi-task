require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const memberRoutes = require('./routes/memberRoutes');
const errorHandler = require('./middleware/errorHandler');

// Database connection
db.sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// Routes
app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/members', memberRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));