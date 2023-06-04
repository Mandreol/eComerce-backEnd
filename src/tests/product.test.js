const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
require("../models");

let token;
let productId;

beforeAll(async () => {
	const credentials = {
		email: "testuser@gmail.com",
		password: "testuser1234",
	};
	const res = await request(app).post("/users/login").send(credentials);
	token = res.body.token;
});

test("POST/poducts should create a new product", async () => {
	const category = await Category.create({ name: "test category" });
	const product = {
		title: "producto 3",
		description: "esta es la descripción del producto 3",
		categoryId: category.id,
		brand: "esta es la marca del producto 3",
		price: 2000,
	};
	const res = await request(app)
		.post("/products")
		.send(product)
		.set("Authorization", `Bearer ${token}`);
	productId = res.body.id;
	await category.destroy();
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET/product should return all products", async () => {
	const res = await request(app).get("/products");
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("PUT/products/:id sould be updated a product", async () => {
	const updateProduct = {
		price: 3000,
	};
	const res = await request(app)
		.put(`/products/${productId}`)
		.send(updateProduct)
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(200);
	expect(res.body.price).toBe(updateProduct.price);
});
test("GET/product/:id should return one products", async () => {
	const res = await request(app).get(`/products/${productId}`);
	expect(res.status).toBe(200);
	expect(res.body.id).toBe(productId);
});

test("DELETE/:id should be remove a product ", async () => {
	const res = await request(app)
		.delete(`/products/${productId}`)
		.set("Authorization", `Bearer ${token}`);
	expect(res.status).toBe(204);
});
