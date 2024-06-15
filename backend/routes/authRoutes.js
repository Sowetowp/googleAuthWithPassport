import express from "express"
import passport from "passport"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config({path: "./config/.env"})

const router = express.Router()
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
// );
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/pp`,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
)

router.get("/login/success", async (req, res) => {
  if (req.user) {
    console.log(req.user._json)
    
    res.status(200).json({
      message: "Succesfully logged in",
    })
  } else {
    res.status(403).json({
      message: "Not Authorized",
    })
  }
})

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401)
  throw new Error("Login Failed")
})

export default router