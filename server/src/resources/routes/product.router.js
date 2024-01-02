const { Router } = require('express');
const { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')
const { adminAuth } = require('../middlewares')

const productRouter = Router()
    .get('/products', getAllProducts)
    .get('/products/:id', getProduct)
    .get('/products/byCategory/:id', getProductsByCategory)
    .post('/products', adminAuth, createProduct)
    .put('/products/:id', adminAuth, updateProduct)
    .delete('/products/:id', adminAuth, deleteProduct)


module.exports = { productRouter }