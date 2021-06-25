const mongoose = require("mongoose");
const joi = require("joi");

const categorySchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: String

}, { timestamps: true });

const Category = mongoose.model("categories", categorySchema);

function validateCategory(params) {
    const schema = joi.object({
        name: joi.string().required(),
        parentId: joi.string()
    });
    return schema.validate(params);
}

module.exports = {
    Category,
    validateCategory
}