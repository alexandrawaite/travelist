const bcrypt = require('bcrypt')

const encryptPassword = (password) => {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

const comparePassword = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash)
}

module.exports = {
  encryptPassword,
  comparePassword,
}