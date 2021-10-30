const express = require('express')
const app = express()
const server = require("http").Server(app);
const port = process.env.PORT || 3000
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const mongoose = require('mongoose');
const path = require("path");
app.use(express.json({extended:false}))
app.use(express.static(path.join(__dirname,'frontend\\build')));



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


const user =  require('./Models/User.js')
const project =  require('./Models/Project.js')


app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})