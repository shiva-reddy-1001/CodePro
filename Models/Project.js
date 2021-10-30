
const mongoose = require('mongoose');


const projectSchema = {
    html:String,
    css:String,
    js:String,
    private:Boolean,
    name:String,
  };

const project = mongoose.model("project", projectSchema);

module.exports = project;