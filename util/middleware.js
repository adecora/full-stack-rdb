const { response } = require("express")

const blogFinder = (Blog) => (async (req, res, next) => {
  req.blog= await Blog.findByPk(req.params.id)
  console.log(JSON.stringify(req.blog, null, 2))
  next()
})

const errorHandler = async (error, req, res, next) => {

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  blogFinder,
  errorHandler
}
