const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes=require('./routes/AuthRoutes');
const taskRoutes=require('./routes/TaskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
