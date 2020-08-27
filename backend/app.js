const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();


/*CROSS ORIGIN RESOURCE SHARING */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //l'origine qui a le droit d'accéder à notre api = tout le monde
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization'); //on autorise certains headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // on autorise certaines méthodes
  next()
})

/* BODY PARSER */
app.use(bodyParser.json()); //.json est une méthode de l'objet bodyParser qui va transformer le corps des requêtes en objets JSON 
/* HELMET */
app.use(helmet());
const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "Terence972"

});
db.connect(function (err) {

  if (err) throw err;

  console.log("Connecté à la base de données MySQL!");

});

module.exports = app;
