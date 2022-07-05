const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Session } = require('../models')

const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username }})
  if (user === null) {
    return res.status(401).json({
      error: 'invalid username'
    })
  }

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
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
  
  const session = await Session.create({ userId: user.id, token })
  
  console.log(JSON.stringify(session, null, 2))
  
  res.status(200).json({
    token,
    username,
    name: user.name
  });
})

module.exports = router
