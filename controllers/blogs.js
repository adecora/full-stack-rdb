const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    console.log(JSON.stringify(blog, null, 2))
    res.json(blog)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } })
  res.status(204).end()
});

module.exports = router
