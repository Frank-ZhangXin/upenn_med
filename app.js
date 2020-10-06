const express = require("express");
const mysql = require("mysql");


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'upenn_sql'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("MySql is connected.")
});

const app = express();

app.listen('3000', () => {
    console.log('Server is listening port 3000.')
});

app.get('/', (req, res) => {
    res.send('Hello word.');
});

app.get('/donor', (req, res) => {
    let sql = `SELECT * from donor`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/donor/search_id', (req, res) => {
    const donorID = req.query.donorID;
    console.log(donorID);
    db.query(`SELECT * FROM donor WHERE donorID = ?`, donorID, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result);
    });
});

app.get('/donor/gender', (req, res) => {
    const gender = req.query.gender;
    console.log(gender);
    db.query(`SELECT * FROM donor WHERE gender = ?`, gender, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result);
    });
});

