const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  github: {
    id: String,
    avatar_url: String
  },
  admin: Boolean,
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
