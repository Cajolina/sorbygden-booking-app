
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const CLIENT_URL = "http://localhost:5173";

const { OrderModel } = require("../models/order.model")
const { EventModel } = require('../models/event.model');

async function createCheckoutSession(req, res) {
    try {
        // Retrieve the current URL from the request headers
        const currentUrl = req.headers.referer;
        // Extract product information from the request body
        const productArray = req.body.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            productType: item.product.type,
        }));

        // Create a checkout session using the Stripe API
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.map((item) => ({
                price_data: {
                    currency: 'sek',
                    product_data: {
                        name: item.product.title,
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.quantity,
            })),
            customer: req.session.id, // Associate the session with the customer's session ID
            success_url: `${CLIENT_URL}/confirmation`,// Redirect URL after successful payment
            cancel_url: currentUrl,
            metadata: {
                product: JSON.stringify(productArray),// Store additional metadata, such as product information

            },
        });
        // Respond with the session URL and ID
        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Could not create checkout session.");
    }
}
// Function to verify a checkout session and handle the order
async function verifySession(req, res) {
    try {
        // Extract relevant data from the request body
        const { sessionId, orderItems } = req.body;

        // Retrieve the Stripe checkout session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false });
        }
        // Retrieve line items from the checkout session
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        // Retrieve product information from session metadata
        const productItem = session.metadata.product;

        // Update event stock status based on ordered quantities
        const parsedProductItems = JSON.parse(productItem);
        for (const parsedProductItem of parsedProductItems) {
            if (parsedProductItem.productType === "event") {
                const event = await EventModel.findById(parsedProductItem.product);

                if (event) {
                    // Update the stock status for the event.
                    event.inStock -= parsedProductItem.quantity;

                    // Save the changes to the database.
                    await event.save();
                }
            }
        }
        // Create a new order in the database and send the credentials for the order
        const order = new OrderModel({
            created: new Date(session.created * 1000).toISOString().split("T")[0],
            customer: {
                name: session.customer_details.name,
                email: session.customer_details.email,
            },
            orderNumber: Math.floor(Math.random() * 1000000),
            orderItems: JSON.parse(productItem).map((item, index) => ({
                product: item.product,
                quantity: item.quantity,
                productType: item.productType,
            })),
            totalOrderAmount: lineItems.data.reduce((total, item) => {
                const price = item.price.unit_amount / 100;
                const quantity = item.quantity;
                return total + price * quantity;
            }, 0),
        });

        await order.save();

        res.status(201).json({ verified: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Function to retrieve all orders from the database
async function getOrders(req, res) {
    try {
        const orders = await OrderModel.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { createCheckoutSession, verifySession, getOrders };