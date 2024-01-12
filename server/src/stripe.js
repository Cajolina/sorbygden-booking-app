require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";

function initStripe() {
    return { stripe, CLIENT_URL }
}

module.exports = { initStripe };