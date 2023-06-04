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
	.post(verifyJWT, upload.single("images"), create);
productImgRouter.route("/:id").delete(verifyJWT, remove);

module.exports = productImgRouter;
