const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Productimg = require("../models/ProductImg");

const getAll = catchError(async (req, res) => {
	const userId = req.user.id;
	const results = await Purchase.findAll({
		where: { id: userId },
		include: [
			{
				model: Product,
				include: [Productimg],
			},
		],
	});
	return res.json(results);
});

const buyCart = catchError(async (req, res) => {
	const userId = req.user.id;
	const cartProducts = await Cart.findAll({
		where: { userId },
		attributes: ["userId", "productId", "quantity"],
		raw: true,
	});
	await Purchase.bulkCreate(cartProducts);
	await Cart.destroy({ where: { userId } });
	return res.status(201).json(purchaseProducts);
});

module.exports = {
	getAll,
	buyCart,
};
