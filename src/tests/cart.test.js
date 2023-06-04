const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let token;
let cartId;

beforeAll(async () => {
	const credentials = {
		email: "testuser@gmail.com",
		password: "testuser1234",
	};
	const res = await request(app).post("/users/login").send(credentials);
	token = res.body.token;
});

test("POST /cart should create a cart", async () => {
	const product = await Product.create({
		title: "producto test",
		description: "esta es la descripción del producto test",
		categoryId: 3,
		brand: "esta es la marca del producto 3",
		price: 2000,
	});
	const cart = {
		productId: product.id,
		quantity: 5,
	};
	const res = await request(app)
		.post("/cart")
		.send(cart)
		.set("Authorization", `Bearer ${token}`);
	await product.destroy();
	cartId = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET /cart", async () => {
	const res = await request(app)
		.get("/cart")
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT /cart/:id", async () => {
	const cartUpdate = {
		rate: 1,
	};
	const res = await request(app)
		.put(`/cart/${cartId}`)
		.send(cartUpdate)
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(200);
	expect(res.body.rate).toBe(cartUpdate.rate);
});

test("DELETE /cart/:id", async () => {
	const res = await request(app)
		.delete(`/cart/${cartId}`)
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(204);
});
