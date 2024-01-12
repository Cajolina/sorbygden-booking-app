const express = require("express");
const {
    createCheckoutSession,
} = require("../controllers/order.controller");


const orderRouter = express
    .Router()
    .post("/create_checkout_session", createCheckoutSession)

module.exports = { orderRouter };