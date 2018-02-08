const express = require('express')
const auth = require('./authentication')

const routes = express.Router()

routes.get('/', (req, res) => res.render('index'))
routes.use('/', auth)

module.exports = routes