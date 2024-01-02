function validate(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (!error) return next();
        res.status(400).json(error.message);
    };
}

function adminAuth(req, res, next) {
    if (req.session?.isAdmin) return next();
    res.status(403).json("You have to be admin to perform this request");
}



module.exports = { validate, adminAuth }