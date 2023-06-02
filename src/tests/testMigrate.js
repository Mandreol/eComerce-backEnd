const sequelize = require("../utils/connection");
require("../models/Category");
require("../models/Product");
require("../models/User");
require("../models/Cart");
require("../models");

const main = async () => {
	try {
		await sequelize.sync({ force: true });

		process.exit();
	} catch (error) {
		console.log(error);
	}
};

main();
