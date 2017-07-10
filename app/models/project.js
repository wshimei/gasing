const mongoose = require('mongoose')
const Schema = mongoose.Schema
var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

let projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true,
    match: urlRegex
  },
  public: {
    type: String,
    required: true,
    match: urlRegex
  },
  category: {
    type: Number,
    required: true
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
