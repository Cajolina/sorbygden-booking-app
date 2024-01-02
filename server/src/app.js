const express = require('express');
const cookieSession = require("cookie-session");
const { productRouter } = require('./resources/routes/product.router');
const { categoryRouter } = require('./resources/routes/category.router');
const { adminRouter } = require('./resources/routes/admin.router');

const app = express();

app.use(express.json());

app.use(cookieSession({
    name: "session",
    keys: ["s3cr3tK3y"],
    maxAge: 1000 * 60 * 60,
    sameSite: "strict",
    httpOnly: true,
}))

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', adminRouter)


module.exports = { app }