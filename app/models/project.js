const mongoose = require('mongoose')
const Schema = mongoose.Schema

let projectSchema = new Schema({
  name: String,
  github: String,
  public: String,
  category: Number
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
