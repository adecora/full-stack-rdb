const Blog = require('./blog')
const User = require('./user')

Blog.belongsTo(User)
User.hasMany(Blog)

// We use migrations to synchronizes our database.
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User
}
