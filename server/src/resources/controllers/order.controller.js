require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const CLIENT_URL = "http://localhost:5173";


async function createCheckoutSession(req, res) {
    try {
        const currentUrl = req.headers.referer;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.map((item) => {
                console.log('item.price:', item.product.price);
                return {
                    price_data: {
                        currency: 'sek',
                        product_data: {
                            name: item.product.title
                        },
                        unit_amount: item.product.price * 100
                    }
                    ,
                    quantity: item.quantity,
                };
            }),
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: currentUrl,
        })
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Could not create checkout session.");
    }
}
module.exports = { createCheckoutSession };
