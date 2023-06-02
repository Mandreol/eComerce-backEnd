const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Productimg = sequelize.define("productimg", {
	url: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	publicId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	//productId
});

module.exports = Productimg;
