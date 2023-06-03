const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");

const getAll = catchError(async (req, res) => {
	const userId = req.user.id;
	const results = await Purchase.findAll({ where: { id: userId } });
	return res.json(results);
});

const create = catchError(async (req, res) => {
	const userId = req.user.id;
	const cartProducts = await Cart.findAll({ where: { userId } });
	const purchaseProducts = await Purchase.bulkCreate(
		cartProducts.map((product) => ({
			userId,
			productId: product.productId,
			quantity: product.quantity,
		}))
	);
	await Cart.destroy({ where: { userId } });
	return res.status(201).json(purchaseProducts);
});

module.exports = {
	getAll,
	create,
};
