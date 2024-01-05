const { FacilityModel } = require("../models/facility.model");


async function getAllFacilities(req, res) {
    try {
        const facilities = await FacilityModel.find({ deleted: false });
        if (facilities.length === 0) {
            return res.status(200).json({ message: 'No facilities found.' });
        }
        res.status(200).json(facilities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }


}

async function getFacility(req, res) {
    try {
        const facility = await FacilityModel.findOne({
            _id: req.params.id,
            deleted: false,
        });

        if (!facility) {
            return res.status(404).json({ message: 'Facility not found.' });
        }
        res.status(200).json(facility);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getFacilitiesByCategory(req, res) {
    try {
        const facility = await FacilityModel.find({ categories: req.params.id });
        if (facility.length === 0) {
            return res.status(404).json({ message: 'No facilities found for the specified category.' });
        }
        res.status(200).json(facility);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function createFacility(req, res) {
    try {
        const facility = new FacilityModel(req.body);
        await facility.save();
        res.status(201).json(facility);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



async function updateFacility(req, res) {
    try {

        const exists = await FacilityModel.findById(req.params.id);
        if (!exists) {
            return res.status(404).json(`${req.params.id} not found`);
        }
        const facility = await FacilityModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json(facility);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function deleteFacility(req, res) {
    try {
        const facility = await FacilityModel.findByIdAndDelete(req.params.id);
        if (!facility) {
            return res.status(404).json({ message: `${req.params.id} not found` });
        }
        return res.status(204).json({ message: "Facility deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getAllFacilities, getFacility, getFacilitiesByCategory, createFacility, updateFacility, deleteFacility }