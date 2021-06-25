const { Product, validateProduct } = require("../models/product");
const slugify = require("slugify");

async function addProduct(req, res) {

    // const { files, body } = req;
    // res.send({files, body});

    const { 
        name, 
        price,
        quantity, 
        description,
        category
    } = req.body;

    let images = []

    if(req.files.length > 0) images = req.files.map(i => { return {img: i.filename}}); 

    const product = new Product({
        name,
        slug: slugify(name),
        price, 
        quantity,
        description, 
        images, 
        category, 
        createdBy: req.user._id 
    });

    await product.save().catch(error => res.status(400).send(error));

    res.status(201).send(product);

}


module.exports = {
    addProduct
}