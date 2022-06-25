const sequelize = require('sequelize')
const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('*')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    order: [
      [sequelize.fn('SUM', sequelize.col('likes')), 'DESC']
    ]
  })

  res.json(blogs)
})

module.exports = router
