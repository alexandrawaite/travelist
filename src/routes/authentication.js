const express = require('express')
const { signUp, signIn } = require('../actions/user')

const router = express.Router()

router.route('/sign-up')
  .get((req, res) => res.render('authentication/sign-up', { error: '' }))
  .post((req, res) => {
    signUp(req.body)
      .then(() => {
        res.redirect('/')
      })
      .catch(() => {
        res.render('authentication/sign-up', { error: 'That email already exists' })
      })
  })

router.route('/sign-in')
  .get((req, res) => res.render('authentication/sign-in', { error: '' }))
  .post((req, res) => {
    signIn(req.body)
      .then((user) => {
        if (!user) {
          res.render('authentication/sign-in', { error: 'Invalid username or password' })
        }
        req.session.user = user
        res.redirect('/')
      })
      .catch(() => {
        res.render('authentication/sign-in', { error: 'Invalid username or password' })
      })
  })

module.exports = router