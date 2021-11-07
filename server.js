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
app.use(express.json({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'frontend\\build')));
app.use(cors());
const saltRounds = 10;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const user = require('./Models/User.js')
const project = require('./Models/Project.js');

const generateToken = (tokenData) => {
  const token = jwt.sign({
    data: tokenData
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};


const verifyToken = (req, res, next) => {
  const Header = req.headers["authorization"];
  const token = Header && Header.split(" ")[1];

  if (token === null || token === undefined) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {

      res.status(403).json({
        message: "Invalid Token"
      })
    } else {
      req.user = user;
      next();
    }
  })
};

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/getProject/:id', verifyToken, (req, res) => {
  project.findOne({
    _id: req.params.id
  }, (err, data) => {
    if (err) throw err
    res.send(data)
  })
});

app.get('/api/getAllProjects/:username', verifyToken, (req, res) => {
  project.find({
    owner: req.params.username
  }, (err, data) => {
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

  user.findOne({
    username: userName
  }, function (err, foundUser) {
    if (err) {
      res.sendStatus(403);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result) {
            const token = generateToken({
              id: userName
            });
            res.send({
              username: userName,
              token: token
            });
          } else {
            res.sendStatus(403);
          }
        });
      } else {
        res.sendStatus(403);
      }
    }
  })
})

app.post('/api/userValidation', verifyToken, (req, res) => {
  const userName = req.user.data.id;

  if (req.user.data.id) {
    const token = generateToken({
      id: userName
    });
    res.send({
      token: token,
      username: userName
    });
  }
})

app.post('/api/newProject', verifyToken, (req, res) => {
  const username = req.body.username;
  const name = req.body.name;

  const newProject = new project({
    html: "",
    css: "",
    js: "",
    name: name,
    owner: username,
  });
  newProject.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        name: name,
        id: newProject._id
      });
    }
  });
})

app.post('/api/saveProject', verifyToken, (req, res) => {
  project.findByIdAndUpdate(req.body.id, {
    html: req.body.html,
    css: req.body.css,
    js: req.body.js
  }, (err, result) => {
    if (err) throw err;
  })
  res.send({
    message: "Successfully saved"
  });
})

app.post('/api/deleteProject', verifyToken, (req, res) => {
  project.findByIdAndDelete(req.body.id, (err, result) => {
    if (err) throw err;
  })
  res.send({
    message: "Successfully deleted"
  });
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})