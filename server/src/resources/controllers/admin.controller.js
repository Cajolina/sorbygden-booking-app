const { AdminModel } = require('../models/admin.model');
const bcrypt = require('bcrypt');

async function register(req, res) {
    try {
        // Checks if admin with the provided email already exists
        const existingAdmin = await AdminModel.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.status(409).json("Email already registred");
        }
        // Creates a new admin instance with the provided request body
        const admin = new AdminModel(req.body);

        // Hashes the admin's password before saving it to the database
        admin.password = await bcrypt.hash(admin.password, 10);
        await admin.save();

        // Creates a JSON, preserving ID and excluding the password
        const jsonAdmin = admin.toJSON();
        jsonAdmin._id = admin._id;
        delete jsonAdmin.password;

        res.status(201).send(jsonAdmin);

    } catch (error) {
        console.log(error);
    }
}

// Login an admin
async function login(req, res) {
    //Find existing admin
    const existingAdmin = await AdminModel.findOne({
        email: req.body.email,
    }).select("+password");

    // Check if no existing admin or compares the provided password with the stored hashed password
    if (
        !existingAdmin ||
        !(await bcrypt.compare(req.body.password, existingAdmin.password))
    ) {
        return res.status(401).json("Wrong password or username");
    }

    // Creates a copy of the administrator's data, preserves the ID, removes the password information
    const admin = existingAdmin.toJSON();
    admin._id = existingAdmin._id;
    delete admin.password;

    //Check already logged in
    if (req.session._id) {
        return res.status(200).json(admin);
    }

    // Sets the req.session to the admin object and responds with the admin object in JSON format
    req.session = admin;
    res.status(200).json(admin);

}

// Logout an admin
async function logout(req, res) {
    // Check if the admin is logged in
    if (!req.session._id) {
        return res.status(400).json("Cannot logout when you are not logged in");
    }
    // Clear the session and respond with a no-content status
    req.session = null;
    res.status(204).json(null);
}
// Authorize an admin
async function authorize(req, res) {
    // Check if the admin is logged in
    if (!req.session._id) {
        return res.status(401).json("You are not logged in");
    }
    res.status(200).json(req.session);
}


module.exports = { register, login, logout, authorize }