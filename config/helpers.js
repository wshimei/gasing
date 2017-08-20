const admins = process.env.ADMINS.split(':')

module.exports = {
  json: function (context) {
    return JSON.stringify(context, null, 2)
  },
  times: function (n, block) {
    var accum = ''
    for (var i = 1; i <= n; i++) {
      accum += block.fn(i)
    }
    return accum
  },
  currentCategory: function (projectCategory, index) {
    console.log(projectCategory, index)
    return ''
  },
  isOwner: function (loggedinUser, owner, options) {
    // console.log(admins, loggedinUser._id, String(ownerId))
    if (loggedinUser) {
      if (
        admins.includes(loggedinUser._id) ||
        loggedinUser._id === String(owner._id)
      ) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    } else {
      return options.inverse(this)
    }
  },
  ownerGithub: function (githubLink) {
    const rgx = /https:\/\/(github\.com)\/([a-z0-9-_]+)/
    githubLink = githubLink.match(rgx)
    return githubLink[0]
  }
}
