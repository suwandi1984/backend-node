const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// const postgre = require('pg');
const { Pool } = require('pg')
const PORT = process.env.PORT || 3001;

// parse application/json
app.use(bodyParser.json());

// user cors()
app.use(cors());

//ssl on
//const conn = new Pool({
//  user:'weufskczjfwcfj',
//  // host:'10.170.84.255',
//  host:'ec2-34-192-210-139.compute-1.amazonaws.com' ,
//  database:'d14v82rrht9jdo',
//  password: '131ed1bb2508cfa80ed86e1392af78d928c0bb02f2546d9d5ab52e66f4ea2d2e',
//  port: 5432
//})

// const conn = new Pool({
//   user:'postgres',
//   // host:'10.170.84.255',
//   host:'localhost' ,
//   database:'econim',
//   password: 'itadmin',
//   port: 5433
// })

// Production //ssl off
// create database connection Heroku Postgres
 const conn = new Pool({
   user:'postgres',
   host:'localhost',
   database:'to-kf-conim',
   password: 'Junior00',
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

app.get('/', (req, res) => {
  res.send('Connectedss! '+PORT)
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World!')
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
// app.listen(3001,() =>{
//   console.log('Server started on port 3001...');
// });

app.listen(PORT,() =>{
  console.log('Server started on NEW port... '+PORT);
});
