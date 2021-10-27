const express = require('express')
const app = express()
const server = require("http").Server(app);
const port = process.env.PORT || 3000
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const path = require("path");
app.use(express.json({extended:false}))
app.use(express.static(path.join(__dirname,'frontend\\build')));
//app.use(cors({ origin: true, credentials: true }));
/*
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
*/
const {user,project} =  require('./Models.js')


app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})