const mongoose = require('mongoose')
const Schema = mongoose.Schema
var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

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
