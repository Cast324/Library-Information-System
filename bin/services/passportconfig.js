const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'Invalid Email or Password' })
    }

    try {
      if (await bcryptjs.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid Email or Password' })
      }
    } catch (e) {
      return done(e)
    }
  }
  console.log('test')
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize