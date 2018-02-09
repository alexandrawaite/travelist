const express = require('express')
const { getCityById, getPostsByCityId } = require('../actions')

const router = express.Router()

router.get('/:cityId', (req, res) => {
  const { cityId } = req.params
  getCityById(cityId)
    .then((city) => {
      getPostsByCityId(cityId)
        .then((posts) => {
          res.render('cities/city', { city, posts })
        })
    })
})

module.exports = router