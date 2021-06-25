const express = require("express");
const router = express.Router();
const path = require("path");
const { authSignin, authAdmin } = require("../middlewares/auth");
const { addProduct } = require("../controller/product");
const { upload } = require("../middlewares/upload");


const productImgPath = path.join(path.dirname(__dirname), "uploads");

router.post("/product/add", [authSignin, authAdmin], upload("productImage", productImgPath), addProduct);


module.exports = router;