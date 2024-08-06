const express = require("express");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
//const sqlite3 = require("sqlite3").verbose();

const app = express();

//connexion à la base de donnée sqlite3
/*
const db = new sqlite3.Database(this.path.join(__dirname,'data','chantier.db'), err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données 'apptest.db'");
});
*/

// connexion à la base de donnée mongonDB
mongoose
  .connect(
    "mongodb+srv://colladobenoit:6vdKVgJ9ImQMJWM1@cluster0.ygygbbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => console.log("Connexion à la base de donnée réussie"))
  .catch((err) => console.log(err + " Connexion à MongoDB échoué !"));
/*
const sql_create = `CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(100) NOT NULL,
  entity VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);`;

db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Création réussie de la table 'Livres'");
});
*/

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-with, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/auth", userRoutes);

module.exports = app;
