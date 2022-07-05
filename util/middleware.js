const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const { Session, User } = require('../models')

const blogFinder = (Blog) => (async (req, res, next) => {
  req.blog= await Blog.findByPk(req.params.id)
  console.log(JSON.stringify(req.blog, null, 2))
  next()
})

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET)
    const session = await Session.findOne({
      where: { userId: decodedToken.id, token: authorization.substring(7) }
    })
    if (!session) {
      return res.status(401).json({ error: 'invalid session' })
    }
    
    const user = await User.findByPk(session.userId)
    if (user.disabled) {
      await session.destroy()
      return res.status(401).json({
        error: 'account disabled, please contact admin'
      })
    }

    req.decodedToken = { ...decodedToken, session: session }
  } else {
    res.status(401).json({ error: 'token missing' })
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
  } else if (
      error.name === 'SequelizeUniqueConstraintError' &&
      error.original.constraint === 'active_sessions_user_id_key'
    ) {
      return res.status(401).json({ error: 'User is already login must logout.' })
  }

  next(error)
}

module.exports = {
  blogFinder,
  tokenExtractor,
  errorHandler
}
