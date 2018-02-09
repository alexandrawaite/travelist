const express = require('express')
const { getUserById } = require('../actions')

const router = express.Router()

router.get('/:userId', (req, res) => {
  const { userId } = req.params
  getUserById(userId)
    .then((user) => {
      res.render('users/profile', { user })
    })
})

module.exports = router