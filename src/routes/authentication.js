const express = require('express')
const { signUp, signIn } = require('../actions')

const router = express.Router()

router.route('/sign-up')
  .get((req, res) => res.render('authentication/sign-up', { error: '' }))
  .post((req, res) => {
    signUp(req.body)
      .then(() => {
        res.redirect('/sign-in')
      })
      .catch((error) => {
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
        res.redirect(`/users/private`)
      })
      .catch(() => {
        res.render('authentication/sign-in', { error: 'Invalid username or password' })
      })
  })

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.log('req.session.user::::', req.session)
    if (err) return next(err)
    res.redirect('/')
  })
})

module.exports = router