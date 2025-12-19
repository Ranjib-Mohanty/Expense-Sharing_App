// MongoDB connection helper
// - Loads environment variables via `dotenv` (useful for local development)
// - Attempts to connect to `MONGO_URI` if set, otherwise falls back to local MongoDB
const mongoose = require("mongoose");
require("dotenv").config();

const DEFAULT_LOCAL = 'mongodb://127.0.0.1:27017/expenseapp';
const uri = process.env.MONGO_URI || DEFAULT_LOCAL;

const connectDB = async () => {
  try {
    // Modern versions of Mongoose no longer require or support `useNewUrlParser` and `useUnifiedTopology` options.
    // Simply pass the connection string and let Mongoose choose sensible defaults.
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message || error);
    // In production we want the process to fail fast so deployment can't continue without a DB.
    if (process.env.NODE_ENV === 'production' || process.env.FAIL_ON_DB === '1') {
      throw error;
    } else {
      console.warn('Continuing without DB connection (development mode). Some routes may fail.');
    }
  }
};

// Export the connection helper and mongoose for scripts/tests that may need a handle.
module.exports = connectDB;
module.exports.mongoose = mongoose;