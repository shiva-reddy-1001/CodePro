const express = require('express')
const app = express()
const server = require("http").Server(app);
const port = process.env.PORT || 5000
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const mongoose = require('mongoose');
const path = require("path");
app.use(express.json({extended:false}))
app.use(express.static(path.join(__dirname,'frontend\\build')));
const saltRounds = 10;



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


const user =  require('./Models/User.js')
const project =  require('./Models/Project.js');
const { strictEqual } = require('assert');
const blah = new project({'html':'<h1>Hello</h1>','name':'test'})
blah.save()

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/api/getProject/:id',(req,res)=>{
    project.findOne({_id:req.params.id},(err,data)=>{
        if(err) throw err
        res.send(data)
    })
})

app.get('/api/getAllProjects/:username',(req, res)=>{
    project.find({owner:req.params.username},(err,data)=>{
        if(err) throw err
        res.send(data)
    })
  })
app.post('/register', (req,res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new user({
      username:req.body.userName,
      firstname:req.body.firstName,
      lastname:req.body.lastName,
      email:req.body.email,
      password:hash,
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        console.log("success");
      }
    });
  });
})

app.post('/login',(req,res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  user.findOne({email: userName}, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if(result){
            //do wahtever u want
          }
      });
      }
    }
  })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})