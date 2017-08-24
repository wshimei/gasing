const mongoose = require('mongoose')
const Schema = mongoose.Schema
var githubRegex = /^(https?:\/\/github?)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

let projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please write the project name']
  },
  slug: {
    type: String
  },
  github: {
    type: String,
    required: [true, 'Please write the project github url'],
    match: [githubRegex, 'The github url is invalid']
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
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  likedBy: [],
  cover: {
    type: String
    // TODO: check if valid url
  },
  description: {
    type: String
    // TODO: length validation
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
