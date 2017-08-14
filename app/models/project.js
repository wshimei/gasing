const mongoose = require('mongoose')
const Schema = mongoose.Schema
var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

let projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please write the project name']
  },
  github: {
    type: String,
    required: [true, 'Please write the project github url'],
    match: [urlRegex, 'The github url is invalid']
  },
  public: {
    type: String,
    required: [true, 'Please write the project live url'],
    match: [urlRegex, 'The live url is invalid']
  },
  category: {
    type: Number,
    required: [true, 'Please choose a category']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
