const express = require("express");
const {
    createCheckoutSession, verifySession
} = require("../controllers/order.controller");


const orderRouter = express
    .Router()
    .post("/create_checkout_session", createCheckoutSession)
    .post("/verify_session", verifySession)

module.exports = { orderRouter };