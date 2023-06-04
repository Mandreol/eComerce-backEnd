const request = require("supertest");
const Product = require("../models/Product");
const Category = require("../models/Category");
const app = require("../app");
require("../models");

let token;
let userId;
let cartId;
let productId;

beforeAll(async () => {
	const credentials = {
		email: "testuser@gmail.com",
		password: "testuser1234",
	};
	const res = await request(app).post("/users/login").send(credentials);
	token = res.body.token;
	userId = res.body.id;
});

test("POST/cart shoult crate a cart", async () => {
	const category = await Category.create({ name: "test" });
	const product = await Product.create({
		title: "producto de prueba",
		description: "descripción del producto de prueba",
		categoryId: category.id,
		brand: "esta es la marca de l producto",
		price: 2000,
	});
	const cart = {
		userId,
		productId: product.id,
		quantity: 1,
	};
	const res = await request(app)
		.post("/cart")
		.send(cart)
		.set("Authorization", `Bearer ${token}`);
	productId = res.body.id;
	await category.destroy();

	cartId = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GEt/should be get all the products of te loged user", async () => {
	const res = await request(app)
		.get("/cart", { where: [userId] })
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(200);
});

test("PUT/cart/:id should update cart of logged user ", async () => {
	const updateCart = {
		quantity: 3,
	};
	const res = await request(app)
		.put(`/cart/${cartId}`)
		.send(updateCart)
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(200);
	expect(res.body.quantity).toBe(updateCart.quantity);
});

test("DELETE/cart/:id should remove a product of de cart", async () => {
	const res = await request(app)
		.delete(`/cart/${productId}`, { where: cartId })
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(204);
});
