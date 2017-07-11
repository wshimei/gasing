const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  github: {
    id: String,
    avatar_url: String
  },
  admin: Boolean
})

const User = mongoose.model('User', userSchema)

module.exports = User
