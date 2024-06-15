import session from "express-session"
import passport from "passport"
import { Strategy as GoogleStategy } from "passport-google-oauth20"

const passportUtil = app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    
    new GoogleStategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        // scope: ["profile", "email"],
        // prompt: 'select_account'
      },
      (accessToken, refreshToken, profile, callback) => {
        callback(null, profile)
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}

export default passportUtil