const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList })

// We use migrations to synchronizes our database.
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, ReadingList
}
