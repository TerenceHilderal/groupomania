const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

const path = require("path");

// dotenv
require("dotenv").config();
/*CROSS ORIGIN RESOURCE SHARING */
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //l'origine qui a le droit d'accéder à notre api = tout le monde
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-with, Content, Accept, Content-Type, Authorization"
	); //on autorise certains headers
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	); // on autorise certaines méthod
	next();
});

/* BODY PARSER */
app.use(bodyParser.json()); //.json est une méthode de l'objet bodyParser qui va transformer le corps des requêtes en objets JSON
app.use(bodyParser.urlencoded({ extended: true }));
/* HELMET */
app.use(helmet());
/*MULTER*/
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
app.use("/api/users/", usersRoutes);
app.use("/api/posts/", postsRoutes);
app.use("/api/posts/", commentsRoutes);

module.exports = app;
