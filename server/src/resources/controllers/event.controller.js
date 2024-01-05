const { EventModel } = require("../models/event.model");



//GET
async function getAllEvents(req, res) {
    try {
        const events = await EventModel.find({ deleted: false });
        if (events.length === 0) {
            return res.status(200).json({ message: 'No events found.' });
        }
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }


}

async function getEvent(req, res) {
    try {
        const event = await EventModel.findOne({
            _id: req.params.id,
            deleted: false,
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getEventsByCategory(req, res) {
    try {
        const event = await EventModel.find({ categories: req.params.id });
        if (event.length === 0) {
            return res.status(404).json({ message: 'No events found for the specified category.' });
        }
        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function createEvent(req, res) {
    try {
        const event = new EventModel(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



async function updateEvent(req, res) {
    try {

        const exists = await EventModel.findById(req.params.id);
        if (!exists) {
            return res.status(404).json(`${req.params.id} not found`);
        }
        const event = await EventModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function deleteEvent(req, res) {
    try {
        const event = await EventModel.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: `${req.params.id} not found` });
        }
        return res.status(204).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getAllEvents, getEvent, getEventsByCategory, createEvent, updateEvent, deleteEvent }