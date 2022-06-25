const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require('../models')

const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username }})
  if (user === null) {
    return res.status(401).json({
      error: 'invalid username'
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid password'
    })
  }

  const userForToken = {
    username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  res.status(200).json({
    token,
    username,
    name: user.name
  });
})

module.exports = router
