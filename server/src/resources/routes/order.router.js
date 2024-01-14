const express = require("express");
const { createCheckoutSession, verifySession } = require("../controllers/order.controller");
const { OrderValidationJoiSchema } = require("../models/order.model");
const { validate } = require("../middlewares")


const orderRouter = express
    .Router()
    .post("/create_checkout_session", createCheckoutSession)
    .post("/verify_session", validate(OrderValidationJoiSchema), verifySession)

module.exports = { orderRouter };