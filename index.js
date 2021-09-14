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

// Production
// create database connection Heroku Postgres
const conn = new Pool({
  user:'rrzfiejogdkdwx',
  host:'ec2-54-83-137-206.compute-1.amazonaws.com',
  database:'d1q7dno61bc5l7',
  password: '704d4554e66350d5e620380bd9389defaebb92e23e8aba0045141e863455262d',
  port: 5432,
  native: true,
  ssl: {
    rejectUnauthorized: false
  }
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