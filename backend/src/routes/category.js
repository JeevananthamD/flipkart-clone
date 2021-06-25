const express = require("express");
const router = express.Router();
const { addCategory, getCategories } = require("../controller/category");
const { authSignin, authAdmin } = require("../middlewares/auth");

router.post("/category/add", [authSignin, authAdmin], addCategory);

router.get("/category/get", getCategories);


module.exports = router;