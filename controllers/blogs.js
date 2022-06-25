const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const router = require('express').Router()

const { Blog, User } = require('../models')

const blogFinder = require('../util/middleware').blogFinder(Blog)
const { tokenExtractor } = require('../util/middleware')

const UserException = require('../util/error')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where.title= {
      [Op.substring]: req.query.search
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  console.log(JSON.stringify(user, null, 2))
  res.json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.decodedToken.id !== req.blog?.userId) {
    throw new UserException('unauthorized operation')
  }
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save({ fields: ['likes'] })
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router
