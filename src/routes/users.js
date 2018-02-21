const express = require('express')
const { getUserById, getPostsByUserId, updateUser } = require('../actions')
const moment = require('moment')

const router = express.Router()

router.get('/private', (req, res) => {
  const { user } = req.session

  if (!req.session.user) {
    res.redirect('/sign-in')
  }

  getUserById(user.id)
    .then((user) => {
      getPostsByUserId(user.id)
        .then((posts) => {
          res.render('users/private-profile', { user, posts, moment })
        })
    })
})

router.get('/:userId', (req, res) => {
  const { userId } = req.params

  getUserById(userId)
    .then((user) => {
      getPostsByUserId(userId)
      .then((posts) => {
        res.render('users/profile', { user, posts, moment })
      })
    })
})

router.get('/:userId/edit', (req, res) => {
  const { userId } = req.params

  getUserById(userId)
    .then((user) => {
      res.render('users/edit-form', { user })
    })
})

router.put('/:userId', (req, res) => {
  const { userId } = req.params

  updateUser(userId, req.body)
    .then(() => {
      res.redirect(`/users/${userId}`)
    })
})

module.exports = router