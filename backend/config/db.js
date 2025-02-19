const mongoose = require('mongoose');

// MongoDB Connection
const connectDB = async () => {
  try {
    // Use the MONGO_URI from your environment variables
    await mongoose.connect(process.env.MONGO_URI, { 
      
     });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
