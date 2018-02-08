const db = require('../db/db')
const { encryptPassword } = require('../utilities/password')

const create = (user) => {
  return encryptPassword(user.password)
    .then((hashedPassword) => {
      const query = `
        INSERT INTO users
          (name, email, password, primary_city)
        VALUES
          ($/name/, $/email/, $/password/, $/primary_city/)
        RETURNING *
      `
      return db.one(query, user)
    })
}

module.exports = {
  create
}