const mongoose = require("mongoose");
const { app } = require("./app");
const dotenv = require("dotenv").config();

// Entry point function, catches errors during execution
main().catch((err) => console.log(err));

async function main() {
    // Log a message indicating successful connection to the database and starting the server
    console.log("Connected to DB & start server");
    // Set mongoose to use strict query mode
    mongoose.set("strictQuery", true);
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    // Start the Express server on the specified port or default to 3001
    app.listen(process.env.PORT || 3001, () =>
        // Log a message indicating the server is running
        console.log("Server is running on http://localhost:3000")
    );
}