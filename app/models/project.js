const mongoose = require('mongoose')
const Schema = mongoose.Schema
var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
