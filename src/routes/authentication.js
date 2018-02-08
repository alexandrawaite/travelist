const express = require('express')
const user = require('../actions/user')

const router = express.Router()

router.route('/sign-up')
  .get((req, res) => {
    res.render('authentication/sign-up', {error: ''})
  })
  .post((req, res, next) => {
    user.create(req.body)
      .then(() => {
        res.redirect('/')
      })
      .catch(() => {
        res.render('authentication/sign-up', {error: 'That email already exists'})
      })
  })

module.exports = router