const express = require('express');
const { productRouter } = require('./resources/routes/product.router');
const { categoryRouter } = require('./resources/routes/category.router');


const app = express();


app.use(express.json());

app.use('/api', productRouter);
app.use('/api', categoryRouter);


module.exports = { app }