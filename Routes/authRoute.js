const express = require("express");
const app = express.Router();


const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "omakase"
});
con.connect((err,resp)=>{
    if(err)throw err;
    console.log(`Database in AUTH_ROUTE is connecting`.green.bgMagenta);
})

app.get('/get_user/:id',(req,res)=>{

    const id = req.params.id;

    con.query(`select * from customers where (customer_id='${id}')`,(err,resp)=>{
        res.json(resp[0]);
    })
})

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    
    con.query(`select customer_id,name from customers where(username='${username}' and password='${password}')`,(err, resp) => {
        console.log('log',resp)
        if(resp.length>0){
            res.json({
                auth:true,
                id:resp[0].customer_id,
                name:resp[0].name
            })
        }else{
            res.json({
                auth:false
            })
        }
    });

});

app.post("/signup", (req, res) => {
    const { username, password, tel, name, email } = req.body;
    
    con.query(`insert into customers(name,email,tel,username,password) 
    values('${name}','${email}','${tel}','${username}','${password}')`,(err, resp) => {
        res.json({
            auth:true,
            id:resp.insertId
        })
    });
});

app.post('/hasUsername',(req,res)=>{

    const {username} = req.body;

    con.query(`select * from customers where (username='${username}')`,(err,resp)=>{
        if(resp.length>0){
            res.json({
                has:true
            })
        }else{
            res.json({
                has:false
            })
        }
    })

})

app.post('/hasEmail',(req,res)=>{
    const {email} = req.body;

    con.query(`select * from customers where (email='${email}')`,(err,resp)=>{
        if(resp.length>0){
            res.json({
                has:true
            })
        }else{
            res.json({
                has:false
            })
        } 
    })

})



module.exports = app;
