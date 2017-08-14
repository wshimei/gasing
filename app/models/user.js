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

userSchema.statics.findOneOrCreate = function (id, cb) {
  return this.findOne({'github.id': id}, cb).then(user => user ? user : this.create({
    'github.id': id
  }, cb))
}

const User = mongoose.model('User', userSchema)

module.exports = User
