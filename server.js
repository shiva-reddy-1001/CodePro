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
app.use(express.json({ extended: false }))
app.use(express.static(path.join(__dirname, 'frontend\\build')));
app.use(cors());
const saltRounds = 10;



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const user = require('./Models/User.js')
const project = require('./Models/Project.js');
const { strictEqual } = require('assert');
const blah = new project({ 'html': '<h1>Hello</h1>', 'name': 'test' })
blah.save()

const generateToken = (tokenData) => {
  const token = jwt.sign({ data: tokenData }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  console.log(token);
  return token;
};
const verifyToken = (token) => {
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodedData;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.message = "User Session Expired";
      err.status = 401;
      throw err;
    }
    throw err;
  }
};

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/getProject/:id', (req, res) => {
  project.findOne({ _id: req.params.id }, (err, data) => {
    if (err) throw err
    res.send(data)
  })
});

app.get('/api/getAllProjects/:username', (req, res) => {
  project.find({ owner: req.params.username }, (err, data) => {
    if (err) throw err
    res.send(data)
  })
});
app.post('/api/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new user({
      username: req.body.username,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: hash,
    });
    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
  });
});

app.post('/api/login', (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  user.findOne({ username: userName }, function (err, foundUser) {
    if(err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result) {
            const token = generateToken({ id: userName });
            console.log(token);
            res.send({ username: userName, token: token });
          }
          else {
            res.status(401);
          }
        });
      }
      else {
        res.status(401);
      }
    }
  })
})

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })