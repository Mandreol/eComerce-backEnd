const catchError = require("../utils/catchError");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Productimg = require("../models/ProductImg");
require("../models");

const getAll = catchError(async (req, res) => {
	const userId = req.user.id;
	const results = await Cart.findAll({
		include: [
			{
				model: Product,
				include: [Productimg],
			},
		],
		where: { userId },
	});
	return res.json(results);
});

const create = catchError(async (req, res) => {
	const result = await Cart.create({
		productId: req.body.productId,
		quantity: req.body.quantity,
		userId: req.user.id,
	});
	return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await Cart.findByPk(id, {
		include: [
			{
				model: Product,
				include: [Productimg],
			},
		],
	});
	if (!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async (req, res) => {
	const { id } = req.params;
	await Cart.destroy({ where: { id } });
	return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
	const { id } = req.params;
	const { quantity } = req.body;
	const result = await Cart.update(
		{ quantity },
		{ where: { id }, returning: true }
	);
	if (result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
};
