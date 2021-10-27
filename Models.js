require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const userSchema = {
    username:String,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
  };

const projectSchema = {
    html:String,
    css:String,
    js:String,
    private:Boolean
  };

const user = mongoose.model("user", userSchema);
const project = mongoose.model("project", projectSchema);

module.exports = {user,project}