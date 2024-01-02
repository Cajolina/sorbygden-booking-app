const express = require("express");
const { register, login, logout } = require('../controllers/admin.controller');
const { validate } = require('../middlewares');
const { AdminValidationJoiSchema } = require('../models/admin.model');


const adminRouter = express.Router()
    .post("/admin/register", validate(AdminValidationJoiSchema), register)
    .post("/admin/login", login)
    .post("/admin/logout", logout)


module.exports = { adminRouter }