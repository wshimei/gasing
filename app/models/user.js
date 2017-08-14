const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  github: {
    id: String,
    avatar_url: String
  },
  admin: Boolean
})

userSchema.statics.findOneOrCreate = function (githubUser, cb) {
  return this.findOne({'github.id': githubUser.id}).then(user => user ? user : this.create({
    name: githubUser.name,
    'github.avatar_url': githubUser.avatar_url,
    'github.id': githubUser.id
  }, cb))
}

const User = mongoose.model('User', userSchema)

module.exports = User
