const bcrypt = require('bcrypt')
const route = require('express').Router()

const { Blog, User } = require('../models')

route.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { 
      exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] 
    }
  })
  console.log(JSON.stringify(users, null, 2))
  res.json(users)
})

route.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    username,
    name,
    passwordHash
  })
  console.log(JSON.stringify(user, null, 2))

  res.json(user)
})

route.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    console.log(JSON.stringify(user, null, 2))
    user.username = req.body.username
    await user.save({ fields: ['username'] })
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = route
