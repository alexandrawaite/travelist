const db = require('../db/db')
const { encryptPassword, comparePassword } = require('../utilities/password')

const signUp = (user) => {
  return encryptPassword(user.password)
    .then((hashedPassword) => {
      const query = `
        INSERT INTO users
          (name, email, password, primary_city)
        VALUES
          ($/name/, $/email/, $/password/, $/primary_city/)
        RETURNING *
      `
      return db.one(query, user.name, user.email, hashedPassword, user.primary_city)
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
    console.log('queriedUser.password =======>', queriedUser.password)
    console.log('user.password =======>', user.password)
    return comparePassword(user.password, queriedUser.password)
      .then((validPassword) => {
        console.log('validPass:::::', validPassword)
        if (!validPassword) throw Error
        return queriedUser
      })
  })
  .catch((error) => {
    console.log('Error occurred while executing signIn::', error)
  })
}

module.exports = {
  signUp,
  signIn
}