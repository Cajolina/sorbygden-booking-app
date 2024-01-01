const { Router } = require('express');
const { getAllCategories, getCategory, createCategory } = require("../controllers/category.controller")

const categoryRouter = Router()
    .get('/categories', getAllCategories)
    .get('/categories/:id', getCategory)
    .post('/categories', createCategory)



module.exports = { categoryRouter }