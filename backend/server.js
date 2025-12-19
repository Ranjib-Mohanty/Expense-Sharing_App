// Main server entry point
// - Loads the configured Express `app` and starts the HTTP server after connecting to MongoDB
const app = require("./app");
const connectDB = require("./src/config/db");
require("dotenv").config();

// Note: `connectDB` will throw on failure in production (or when FAIL_ON_DB=1). In development it logs and allows the server to start so you can iterate without a DB.

// PORT can be overridden via environment variable (e.g., in production)
const PORT = process.env.PORT || 5000;

// Start the server after the DB connection (keeps startup order deterministic)
const startServer = async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('DB connection failed, continuing without DB:', err.message || err);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Kick off the startup process
startServer();


