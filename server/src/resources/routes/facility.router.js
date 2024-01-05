const { Router } = require('express');
const { getAllFacilities, getFacility, getFacilitiesByCategory, createFacility, updateFacility, deleteFacility } = require('../controllers/facility.controller')
const { adminAuth } = require('../middlewares')

const facilityRouter = Router()
    .get('/facilities', getAllFacilities)
    .get('/facilities/:id', getFacility)
    .get('/facilities/byCategory/:id', getFacilitiesByCategory)
    .post('/facilities', adminAuth, createFacility)
    .put('/facilities/:id', adminAuth, updateFacility)
    .delete('/facilities/:id', adminAuth, deleteFacility)


module.exports = { facilityRouter }