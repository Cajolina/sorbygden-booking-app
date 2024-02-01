const express = require('express');
const cookieSession = require("cookie-session");
const { eventRouter } = require('./resources/routes/event.router');
const { facilityRouter } = require('./resources/routes/facility.router')
const { categoryRouter } = require('./resources/routes/category.router');
const { adminRouter } = require('./resources/routes/admin.router');
const { orderRouter } = require('./resources/routes/order.router');

const app = express();

app.use(express.json());

app.use(cookieSession({
    name: "session",
    keys: ["s3cr3tK3y"],
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
}))


app.use('/api', eventRouter, facilityRouter, categoryRouter, adminRouter, orderRouter);



module.exports = { app }