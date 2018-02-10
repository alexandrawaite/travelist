const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    res.locals.isLoggedIn = true
  }
  next()
}

const setDefaultResponseLocals = (req, res, next) => {
  res.locals.isLoggedIn = false
  next()
}

module.exports = {
  isLoggedIn,
  setDefaultResponseLocals
}