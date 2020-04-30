const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    if (user == null) {
      console.log('null')
      return done(null, false, { message: 'Invalid Email or Password' })
    }

    try {
      if (password == user[0].dataValues.password) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid Email or Password' })
      }
    } catch (e) {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user[0].dataValues.accountId))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize