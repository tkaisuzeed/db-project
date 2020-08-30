const express = require('express');
const app = express();

const mysql = require('mysql');

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "omakase"
})

app.get('/get_trip',(req,res)=>{
    
    const sql = `select * from trip`;
    con.getConnection((err,resp)=>{
        con.query(sql,(err,resp)=>{
            res.json(resp);
        })
    })
})

app.post('/buy_ticket',(req,res)=>{

    

})

module.exports = app