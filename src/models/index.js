const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Productimg = require("./ProductImg");
const User = require("./User");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Productimg);
Productimg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);
