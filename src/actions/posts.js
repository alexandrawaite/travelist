const db = require('../db/db')

const getPostsByCityId = (cityId) => {
  const query = `
    SELECT * from
      posts
    WHERE city_id = $1
  `
  return db.any(query, [cityId])
}

module.exports = {
  getPostsByCityId,
}