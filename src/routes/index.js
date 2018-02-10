const express = require('express')
const auth = require('./authentication')
const cities = require('./cities')
const users = require('./users')
const posts = require('./posts')
const { getCities } = require('../actions')
const { setDefaultResponseLocals, isLoggedIn } = require('./sessionMiddleware')

const routes = express.Router()

routes.use(setDefaultResponseLocals)
routes.use(isLoggedIn)

routes.get('/', (req, res) => {
  getCities()
    .then((cities) => {
      res.render('index', { cities })
    })
})

routes.use('/', auth)
routes.use('/cities', cities)
routes.use('/users', users)
routes.use('/posts', posts)

module.exports = routes