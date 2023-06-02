const {
	getAll,
	remove,
	create,
} = require("../controllers/productimg.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");
const upload = require("../utils/multer");

const productImgRouter = express.Router();

productImgRouter
	.route("/")
	.get(verifyJWT, getAll)
	.delete(verifyJWT, remove)
	.post(verifyJWT, upload.single("image"), create);

module.exports = productImgRouter;
