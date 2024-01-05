const { Router } = require('express');
const { getAllEvents, getEvent, getEventsByCategory, createEvent, updateEvent, deleteEvent } = require('../controllers/event.controller')
const { adminAuth } = require('../middlewares')

const eventRouter = Router()
    .get('/events', getAllEvents)
    .get('/events/:id', getEvent)
    .get('/events/byCategory/:id', getEventsByCategory)
    .post('/events', adminAuth, createEvent)
    .put('/events/:id', adminAuth, updateEvent)
    .delete('/events/:id', adminAuth, deleteEvent)


module.exports = { eventRouter }