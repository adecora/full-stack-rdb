const router = require('express').Router()

const { Reading } = require('../models')

router.post('/', async (req, res) => {
  const reading = await Reading.create(req.body)
  console.log(JSON.stringify(reading, null, 2))
  res.json(reading)
})

module.exports = router
