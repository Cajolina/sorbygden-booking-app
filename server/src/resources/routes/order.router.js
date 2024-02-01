const express = require("express");
const { createCheckoutSession, verifySession, getOrders } = require("../controllers/order.controller");
const { OrderValidationJoiSchema } = require("../models/order.model");
const { validate } = require("../middlewares")


const orderRouter = express
    .Router()
    .post("/create_checkout_session", createCheckoutSession)
    .post("/verify_session", validate(OrderValidationJoiSchema), verifySession) // Applying the validate middleware to ensure session verification data is validated using the OrderValidationJoiSchema
    .get("/orders", getOrders)
module.exports = { orderRouter };