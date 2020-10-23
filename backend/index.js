const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const axios = require("axios");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

app.set("json spaces", 2);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "orgs", 
});

db.getConnection(function(err, connection) {
    if (err) {
        return console.error('error: ' + err.message);
      }
    
      console.log('Connected to the MySQL server.');
  });

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM org_posts";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post('/api/insert', (req, res) => {

    const org = req.body.org;
    const post = req.body.post;

    const sqlInsert = 
        "INSERT INTO org_posts (org, post) VALUES (?, ?)";
    db.query(sqlInsert, [org, post], (err, result) => {
        if (err) console.log(err);
        console.log(result);
    })
});

app.delete('/api/delete/:org', (req, res) => {
    const org = req.params.org;
    const sqlDelete = "DELETE FROM org_posts WHERE org = ?";
    db.query(sqlDelete, org, (err, result) => {
        if (err) console.log(err);
    })
});

app.put('/api/update', (req, res) => {
    const org = req.body.org;
    const post = req.body.post
    const sqlUpdate = "UPDATE org_posts SET post = ? WHERE org = ?";
    db.query(sqlUpdate, [post, org], (err, result) => {
        if (err) console.log(err);
    })
});

app.listen(PORT, function () {
    console.log(`server listening on port ${PORT}`)
});