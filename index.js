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
const conn = new Pool({
  user:'gistpjbegtrztp',
  // host:'10.170.84.255',
  host:'ec2-52-21-136-176.compute-1.amazonaws.com' ,
  database:'d4lnof30uc148f',
  password: '9e30041de25ca0f7874a1870f652cd9ce8d9d0da2ade2d5dba5c0d0b91cf41b2',
  port: 5432
})

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
// const conn = new Pool({
//   user:'postgres',
//   host:'localhost',
//   database:'to-kf-conim',
//   password: 'Junior00',
//   port: 5432,
//   native: true,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })


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