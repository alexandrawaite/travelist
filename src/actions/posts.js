const db = require('../db/db')

const createPost = (post) => {
  const query = `
    INSERT INTO
      posts (city_id, user_id, title, body)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *
  `
  return db.one(query, [post.city_id, post.user_id, post.title, post.body])
}

const getPostById = (postId) => {
  const query = `
    SELECT
      users.name, cities.name, posts.id, posts.title, posts.body, posts.created_at
    FROM
      posts
    JOIN users ON posts.user_id = users.id
    JOIN cities ON posts.city_id = cities.id
      WHERE posts.id = $1
  `
  return db.one(query, [postId])
}

const getPostsByCityId = (cityId) => {
  const query = `
  SELECT
    users.name, posts.id, posts.user_id, posts.title, posts.body, posts.created_at
  FROM
    posts
  JOIN users ON posts.user_id = users.id
  WHERE city_id = $1
  `
  return db.any(query, [cityId])
}

const getPostsByUserId = (userId) => {
  const query = `
    SELECT
      cities.name, posts.id, posts.title, posts.body, posts.created_at
    FROM
      posts
    JOIN cities ON posts.city_id = cities.id
    WHERE user_id = $1
  `
  return db.any(query, [userId])
}


const updatePost = (postId, post) => {
  const query = `
    UPDATE
      posts
    SET
      title = $1,
      body = $2
    WHERE
      id = $3
    RETURNING *
  `
  return db.one(query, [post.title, post.body, postId])
}

module.exports = {
  createPost,
  getPostById,
  getPostsByCityId,
  getPostsByUserId,
  updatePost,
}