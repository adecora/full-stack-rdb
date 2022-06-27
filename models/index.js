const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Reading })
Blog.belongsToMany(User, { through: Reading })

// We use migrations to synchronizes our database.
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, Reading
}
