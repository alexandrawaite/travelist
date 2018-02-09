const db = require('../db/db')

const getCities = () => {
  const query = `
    SELECT * FROM
      cities
  `
  return db.any(query)
}

const getCityById = (cityId) => {
  const query = `
    SELECT * FROM
      cities
    WHERE id = $1
  `
  return db.one(query, [cityId])
}

module.exports = {
  getCities,
  getCityById,
}