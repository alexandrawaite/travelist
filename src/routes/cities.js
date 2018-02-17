const express = require('express')
const moment = require('moment')
const { getCityById, getPostsByCityId } = require('../actions')

const router = express.Router()

router.get('/:cityId', (req, res) => {
  const { cityId } = req.params
  getCityById(cityId)
    .then((city) => {
      getPostsByCityId(cityId)
        .then((posts) => {
          res.render('cities/city', { moment, city, posts })
        })
    })
})

module.exports = router