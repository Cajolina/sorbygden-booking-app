const { Router } = require('express');
const { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

const productRouter = Router()
    .get('/products', getAllProducts)
    .get('/products/:id', getProduct)
    .get('/products/byCategory/:id', getProductsByCategory)
    .post('/products', createProduct)
    .put('/products/:id', updateProduct)
    .delete('/products/:id', deleteProduct)


module.exports = { productRouter }