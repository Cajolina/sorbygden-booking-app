const express = require("express");
const { register, login, logout, authorize } = require('../controllers/admin.controller');
const { validate } = require('../middlewares');
const { AdminValidationJoiSchema } = require('../models/admin.model');


const adminRouter = express.Router()
    .post("/admin/register", validate(AdminValidationJoiSchema), register)// Adding the validate middleware to ensure registration data is validated using the AdminValidationJoiSchema
    .post("/admin/login", login)
    .post("/admin/logout", logout)
    .get("/admin/authorize", authorize);

module.exports = { adminRouter }