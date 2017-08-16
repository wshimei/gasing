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
  return this.findOne({'github.id': githubUser.id})
  .exec(function (err, user) {
    if (err) cb(err)

    if (user) {
      cb(null, user)
    } else {
      this.create({
        name: githubUser.name,
        'github.avatar_url': githubUser.avatar_url,
        'github.id': githubUser.id
      }, function (err, createdUser) {
        if (err) cb(err)

        cb(null, createdUser)
      })
    }
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User
