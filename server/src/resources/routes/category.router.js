const { Router } = require('express');
const { getAllCategories, getCategory, createCategory } = require("../controllers/category.controller")
const { adminAuth } = require('../middlewares')
const categoryRouter = Router()
    .get('/categories', getAllCategories)
    .get('/categories/:id', getCategory)
    .post('/categories', adminAuth, createCategory)



module.exports = { categoryRouter }