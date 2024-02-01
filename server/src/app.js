const express = require('express');
const cookieSession = require("cookie-session");
const { eventRouter } = require('./resources/routes/event.router');
const { facilityRouter } = require('./resources/routes/facility.router')
const { categoryRouter } = require('./resources/routes/category.router');
const { adminRouter } = require('./resources/routes/admin.router');
const { orderRouter } = require('./resources/routes/order.router');

// Create an Express application instance
const app = express();

app.use(express.json());
// Set up cookie session middleware for session management
app.use(cookieSession({
    name: "session",
    keys: ["s3cr3tK3y"],
    maxAge: 24 * 60 * 60 * 1000, // Session duration set to 24 hours
    sameSite: "strict",
    httpOnly: true,
}))

// Define routes for different resources using routers
app.use('/api', eventRouter, facilityRouter, categoryRouter, adminRouter, orderRouter);



module.exports = { app }