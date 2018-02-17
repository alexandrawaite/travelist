const express = require('express')
const moment = require('moment')
const { createPost, getPostById, updatePost, getUserById, getCityById } = require('../actions')

const router = express.Router()

router.route('/:cityId/new')
  .get((req, res) => {
    const { user } = req.session
    const { cityId } = req.params
    getUserById(user.id)
      .then((user) => {
        getCityById(cityId)
          .then((city) => {
            res.render('posts/new', { user, city })
          })
      })
  })
  .post((req, res) => {
    console.log('req.body:::', req.body)
    const { cityId } = req.params
    createPost(req.body)
      .then(() => {
        res.redirect(`/cities/${cityId}`)
      })
  })

router.get('/:postId', (req, res) => {
  const { postId } = req.params
  getPostById(postId)
    .then((post) => {
      console.log('post::::', post)
      res.render('posts/post', { moment, post })
    })
})

router.get('/:postId/edit', (req, res) => {
  const { postId } = req.params
  getPostById(postId)
    .then((post) => {
      res.render('posts/edit-form', { post })
    })
})

router.put('/:postId', (req, res) => {
  const { postId } = req.params
  updatePost(postId, req.body)
    .then(() => {
      res.redirect(`/posts/${postId}`)
    })
})

module.exports = router