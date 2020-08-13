// import passport and passport-jwt modules
const Passport = require('passport')
const PassportJWT = require('passport-jwt')
// const PassportLocal = require('passport-local')
// const FacebookTokenStrategy = require('passport-facebook-token')
// const SQLDB = require('../db/mysql')
const config = require('../config')
const { nowPlusMinutes } = require('../helpers')
const { decrypt } = require('./encryption')
const { handleError, buildErrObject } = require('./errors')
/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {String} token - decrypted token
 */
const jwtExtractor = req => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }
  if (token) {
    // Decrypts token
    token = decrypt(token, config.get('encryption.mode'), config.get('encryption.secretKey'))
  }
  return token
}
module.exports = {
  init: app => {
    // ExtractJwt to help extract the token
    // const ExtractJwt = PassportJWT.ExtractJwt
    // JwtStrategy which is the strategy for the authentication
    const JwtStrategy = PassportJWT.Strategy
    const jwtOptions = {}
    jwtOptions.jwtFromRequest = jwtExtractor
    jwtOptions.secretOrKey = config.get('jwt.secretKey')
    /* // lets create our strategy for local username & password
    let localOptions = {
      usernameField: "email"
    }
    let localLogin = new PassportLocal(localOptions, (email, password, done) => {
      // TODO: validate user..
      // return done(err)
      // return done(null, false)
      // return done(null, result)
    }) */
    // lets create our strategy for web token
    const strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
      const payload = jwt_payload.data
      if (payload && 'id' in payload && 'uuid' in payload) {
        if ('user_type' in payload) {
          if (payload.user_type === 'public') {
            const app_instance = await SQLDB.app_instance.validateAppInstance('uuid', payload.uuid)
            if (app_instance) {
              app_instance.user_type = 'public'
              next(null, app_instance)
            } else next(null, false, { message: 'Invalid request' })
          } else {
            const userSchema = payload.user_type === 'customer' ? SQLDB.customer : SQLDB.user
            const userSessionSchema = payload.user_type === 'customer' ? SQLDB.customer_session : SQLDB.user_session
            const user = await userSchema.validateUser('id', payload.id)
            if (user) {
              const sessionData = await userSessionSchema.verifySession(payload.id, payload.uuid)
              if (sessionData) {
                if (sessionData.ttl > nowPlusMinutes(0)) {
                  const user_data = JSON.parse(JSON.stringify(user))
                  // const user_data = user.toJSON()
                  user_data.uuid = payload.uuid
                  user_data.user_type = payload.user_type
                  delete user_data.password
                  next(null, user_data)
                } else {
                  await userSessionSchema.destroySession(payload.id, payload.uuid)
                  next(null, false, { message: 'Session expired' })
                }
              } else next(null, false, { message: 'Token not found' })
            } else next(null, false, { message: 'Invalid request' })
          }
        } else next(null, false, { message: 'Invalid headers' })
      } else next(null, false, { message: 'Invalid headers' })
    })
    // use the jwt strategy
    Passport.use(strategy)
    /* const facebookStrategy = new FacebookTokenStrategy({
      clientID: 'YOUR-CLIENT-ID-HERE',
      clientSecret: 'YOUR-CLIENT-SECRET-HERE'
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        if (await User.findOne({ 'facebook_id': profile.id })) return console.log('this account is already registered!')
        const email = profile.emails[0].value;
        const { id: facebook_id, displayName: name } = profile;
        const user = await User.create({
          email, facebook_id, name
        })
        await user.save();

        console.log(user)
      } catch (error) {
        done(error, false, error.message)
      }
    })
    // use the facebook strategy
    Passport.use(facebookStrategy) */
    app.use(Passport.initialize())
  },
  // auth: type => Passport.authenticate(type, { session: false })
  auth: type => (req, res, next) => {
    Passport.authenticate(type, { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (!user) handleError(res, buildErrObject(401, 'User is not authenticated.'))
      req.user = user
      next()
    })(req, res, next)
  }
}
