const { Category, validateCategory } = require("../models/category");
const slugify = require("slugify");


async function addCategory(req, res) {
    
    let { error } = validateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let category = await Category.findOne({ slug: slugify(req.body.name) })
    if(category) return res.status(400).send("Category is already exsist.");

    category = new Category({
        name: req.body.name,
        slug: slugify(req.body.name)
    });

    if(req.body.parentId) category.parentId = req.body.parentId;

    await category.save().catch(error => res.status(400).send(error));

    res.status(200).send(category);

}

async function getCategories(req, res) {
    const categories = await Category.find().catch(error => res.status(500).send(error));
    const categoryList = createCategoryList(categories);
    res.status(200).send(categoryList);
}

function createCategoryList(categories, parentId = null) {
    
    const categoryList = [];
    let category;
    if(parentId === null) {
        category = categories.filter(i => i.parentId == undefined);
    }
    else {
        category = categories.filter(i => i.parentId == parentId);
    }

    category.forEach(i => {
        categoryList.push({
            _id: i._id,
            name: i.name,
            slug: i.slug,
            children: createCategoryList(categories, i._id)
        });
    });

    return categoryList;

}

module.exports = {
    addCategory,
    getCategories
}