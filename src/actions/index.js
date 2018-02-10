const { signUp, signIn, getUserById, updateUser } = require('./users')
const { getCities, getCityById } = require('./cities')
const { createPost, getPostById, getPostsByCityId, getPostsByUserId, updatePost } = require('./posts')

module.exports = {
  signUp,
  signIn,
  getUserById,
  updateUser,
  getCities,
  getCityById,
  createPost,
  getPostById,
  getPostsByCityId,
  getPostsByUserId,
  updatePost,
}