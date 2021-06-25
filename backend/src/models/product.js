const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = mongoose.Schema({

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
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: Number,
    images: [
        { img: String }
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "categories",
        required: true
    },
    reviews: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "users"
            },
            review: String
        }
    ],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    updatedAt: Date

}, { timestamps: true });

const Product = mongoose.model("products", productSchema);

function validateProduct(params) {
    const schema = joi.object({
        name: joi.string().required()
    });
    return schema.validate(params);
}

module.exports = {
    Product,
    validateProduct
}