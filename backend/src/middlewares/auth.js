const jwt = require("jsonwebtoken");
require("dotenv/config")

function authUser(req, res, next) {
    
    const token = req.header("authentication");
    if(!token) return res.status(401).send("No token present");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
    
}

function authAdmin(req, res, next) {
    
    if(!req.user.isAdmin) return res.status(401).send("Unauthorized User");
    next();

}

module.exports = {
    authUser,
    authAdmin
};