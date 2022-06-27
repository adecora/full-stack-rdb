const bcrypt = require('bcrypt')
const router = require('express').Router()

const { Blog, User, Reading } = require('../models')

const { tokenExtractor } = require('../util/middleware')

const UserException = require('../util/error')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { 
      exclude: ['passwordHash', 'createdAt', 'updatedAt'],
    },
    include: {
      model: Blog,
      attributes: { exclude: 'userId' }
    }
  })
  console.log(JSON.stringify(users, null, 2))
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { 
      exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] 
    },
    include: {
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt']
      },
      through: {
        attributes: []
      }
    }
  })
  console.log(JSON.stringify(user, null, 2))
  res.json(user)
})

router.post('/', async (req, res) => {
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

router.put('/:username', tokenExtractor, async (req, res) => {
  if (req.decodedToken.username !== req.params.username) {
    throw new UserException('unauthorized operation')
  }
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

module.exports = router
