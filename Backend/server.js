const app = require("./app");
const connectionDB = require("./db/Database");

const port = process.env.PORT;  // Add fallback port

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to an uncaught exception");
    process.exit(1);
});

// Config
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config({
        path: "config/.env"
    });
}
//connect DB
connectionDB();

// Log the port to check if it’s properly loaded
console.log(`Port from env: ${process.env.PORT}`);

// Create server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to an unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
