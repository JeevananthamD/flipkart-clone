const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv/config");


const saltRounds = 10;

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        trim: true,
        min: 1,
        max: 20
    },
    // userName: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     index: true,
    //     lowercase: true
    // },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    contactNumber: String,
    profilePicture: String
}, { timestamps: true });

userSchema.virtual("password").set(function(password) {
    this.hashPassword = bcrypt.hashSync(password, saltRounds);
});

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hashPassword);
    },
    generateAuthToken: function() {
        const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET_KEY); //, { expiresIn: "1h" }
        return token;
    }
}

const User = mongoose.model("users", userSchema);

function validateUserSignUp(params) {
    const schema = joi.object({
        firstName: joi.string().min(3).max(20).required(),
        lastName: joi.string().min(1).max(20),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required()
    });
    return schema.validate(params);
}

function validateUserSignIn(params) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required()
    });
    return schema.validate(params);
}

module.exports = {
    User,
    validateUserSignUp,
    validateUserSignIn
}