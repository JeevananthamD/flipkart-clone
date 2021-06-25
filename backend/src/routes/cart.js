const express = require("express");
const router = express.Router();
const { authSignin, authUser } = require("../middlewares/auth");
const { addItem } = require("../controller/cart");


router.post("/user/cart/add", [authSignin, authUser], addItem);


module.exports = router;