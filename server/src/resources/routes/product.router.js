const { Router } = require('express');
const { getAllProducts, getProduct, getProductsByCategory, createProduct } = require('../controllers/product.controller')

const productRouter = Router()
    .get('/products', getAllProducts)
    .get('/products/:id', getProduct)
    .get('/products/byCategory/:id', getProductsByCategory)
    .post('/products', createProduct)



module.exports = { productRouter }