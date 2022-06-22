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

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  console.log(JSON.stringify(req.blog, null, 2))
  next()
}

router.delete('/:id', async (req, res) => {
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
