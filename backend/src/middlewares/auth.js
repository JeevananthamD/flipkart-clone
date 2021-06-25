const jwt = require("jsonwebtoken");
require("dotenv/config")

function authSignin(req, res, next) {
    
    const token = req.header("authorization");
    if(!token) return res.status(401).send("Signin required");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send("Signin required");
    }
    
}

function authAdmin(req, res, next) {
    
    if(!req.user.isAdmin) return res.status(401).send("Unauthorized");
    next();

}

function authUser(req, res, next) {
    
    if(req.user.isAdmin) return res.status(401).send("Unauthorized");
    next();

}

module.exports = {
    authSignin,
    authAdmin,
    authUser
};