const express = require('express')
const auth = require('./authentication')
const cities = require('./cities')
const users = require('./users')
const { getCities } = require('../actions')

const routes = express.Router()

routes.get('/', (req, res) => {
  getCities()
    .then((cities) => {
      res.render('index', { cities })
    })
})

routes.use('/', auth)
routes.use('/cities', cities)
routes.use('/users', users)

module.exports = routes