const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// const postgre = require('pg');
const { Pool } = require('pg')
// const pgp = require('pg-promise')

// const cn = {
//   host:'localhost',
//   port: 5432,
//   database: 'df',
//   user: 'postgres',
//   password: 'Junior00'
// }
// const db = pgp(cn);

// db.one('select * from df_test').then(result=>{
//   console.log('hasil')
// })


// didalam scripts
// "backend": "nodemon ./index.js",
 
// parse application/json
app.use(bodyParser.json());

// user cors()
app.use(cors());

 
// //create database connection
// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'employees'
// });


// //create database connection
// const conn = new Pool({
//   user:'postgres',
//   host:'localhost',
//   database:'df',
//   password: 'Junior00',
//   port: 5432
// })

//create database connection Heroku Postgres
const conn = new Pool({
  user:'mxjhctjcfqfwyz',
  host:'ec2-54-83-82-187.compute-1.amazonaws.com',
  database:'d2g5r8cboh92iq',
  password: '061ff39b407dc0101e044c345085d588bb15ef92167cf672e2ac88ef7f625fa2',
  port: 5432
})

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connecteds...');
});

//api query
app.post('/api/query',(req, res) => {
    let sql = req.body.query;
    console.log('request_custom :', req)
    console.log('query : ', sql)
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
 
//Server listening
app.listen(3001,() =>{
  console.log('Server started on port 3001...');
});