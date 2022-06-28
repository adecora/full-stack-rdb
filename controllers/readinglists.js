const router = require('express').Router()

const { ReadingList } = require('../models')

const { tokenExtractor } = require('../util/middleware')

const UserException = require('../util/error')

router.post('/', async (req, res) => {
  const reading = await ReadingList.create(req.body)
  console.log(JSON.stringify(reading, null, 2))
  res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const reading = await ReadingList.findByPk(req.params.id)

    if (reading && req.decodedToken.id !== reading.userId) {
      throw new UserException('unauthorized operation')
    }

    if (reading) {
      console.log(JSON.stringify(reading, null, 2))
      reading.read = req.body.read
      await reading.save({ fields: ['read'] })
      res.json(reading)
    } else {
      res.status(404).end()
    }
})

module.exports = router
