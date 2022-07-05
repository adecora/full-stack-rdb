const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  await req.decodedToken.session.destroy()
  
  res.status(204).end()
})

module.exports = router
