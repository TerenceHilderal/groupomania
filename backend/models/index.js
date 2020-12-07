"use strict";

const fs = require("fs");
const path = require("path");
const { getMaxListeners } = require("process");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const bcrypt = require("bcrypt");
require("dotenv").config();

const db = {};

const config = {
	development: {
		username: process.env.DB_USERNAME,
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

// UNE FOIS LA BASE DE DONNEES CREE MERCI DE DECOMMENTER LE BOUT DE CODE CI-DESSOUS AVANT DE LANCER LE SERVEUR,
// ET REMPLACER LES VALEURS SOUHAITEES POUR CREER UN COMPTE MODERATEUR
// !! LA VALEUR DEFAULT , ET LES 4 DERNIERES VALEURS DOIVENT RESTER TELS QUELLES
// Par sécurité le mot de passe doit contenir au minimum une lettre majuscule,une minuscule,un chiffre et un caractere special(voir l'exemple)

// const password = pw => bcrypt.hashSync(pw, 10);

// const privilegedUser = sequelize.query(
// 	`INSERT INTO Users (id,email,username,password,role,isAdmin,latent,createdAt,updatedAt) VALUES (DEFAULT,"www@gmail.com","xxx","${password(
// 		"Unmot2passe@"
// 	)}"
// 		,"dev",1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`
// );

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
