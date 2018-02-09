const db = require('../db/db')
const { encryptPassword, comparePassword } = require('../utilities/password')

const signUp = (user) => {
  return encryptPassword(user.password)
    .then((hashedPassword) => {
      const query = `
        INSERT INTO users
          (name, email, password, primary_city)
        VALUES
          ($1, $2, $3, $4)
        RETURNING *
      `
      return db.one(query, [user.name, user.email, hashedPassword, user.primary_city])
    })
}

const signIn = (user) => {
  const query = `
    SELECT * FROM
      users
    WHERE email = $/email/
  `
  return db.oneOrNone(query, user)
  .then((queriedUser) => {
    return comparePassword(user.password, queriedUser.password)
      .then((validPassword) => {
        if (!validPassword) throw Error
        return queriedUser
      })
  })
}

const getUserById = (userId) => {
  const query = `
    SELECT * FROM
      users
    WHERE id = $1
  `
  return db.one(query, [userId])
}

module.exports = {
  signUp,
  signIn,
  getUserById,
}