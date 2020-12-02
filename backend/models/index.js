"use strict";

const fs = require("fs");
const path = require("path");
const { getMaxListeners } = require("process");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];

require("dotenv").config();

const db = {};

const config = {
	development: {
		username: "root",
		password: process.env.DB_PASSWORD,
		database: "groupomania_development",
		host: "127.0.0.1",
		dialect: "mysql"
	}
}[env];

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}
const users = sequelize
	.query("SELECT * FROM Users")
	.then(response => console.log(response));

// const privilegedUser = sequelize
// 	.query(
// 		`INSERT INTO Users (id,email,username,password,role,isAdmin,latent,createdAt,updatedAt) VALUES (DEFAULT,"azerty@gmail.com","azerty","Terence972@","dev",1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`
// 	)
// 	.then(results => console.log(results));

// const privilegedUser = (
// 	id,
// 	email,
// 	username,
// 	password,
// 	role,
// 	isAdmin,
// 	latent,
// 	createdAt,
// 	updatedAt
// ) => {
// 	sequelize
// 		.query(
// 			`INSERT INTO Users (id,email,username,password,role,isAdmin,latent,createdAt,updatedAt) VALUES('DE','${email}','${username}','${password}','${role}','${isAdmin}','${latent}','${createdAt}','${updatedAt}')`
// 		)
// 		.then(response => console.log(response));
// };

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
