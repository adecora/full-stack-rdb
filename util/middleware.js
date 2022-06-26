const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const blogFinder = (Blog) => (async (req, res, next) => {
  req.blog= await Blog.findByPk(req.params.id)
  console.log(JSON.stringify(req.blog, null, 2))
  next()
})

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  } else {
    res.status(401).json({ error: 'token missing'})
  }

  next()
}

const errorHandler = async (error, req, res, next) => {

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ 
      error: error.message.replace(
        /(max|min) on year failed/, 
        "year must be an integer at least equal to 1991 but not greater than the current year"
      )
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message })
  } else if (error.name === 'UserException') {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  blogFinder,
  tokenExtractor,
  errorHandler
}
