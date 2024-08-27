const express = require('express')
const router = express.Router({ mergeParams: true })
// const User = require("../models/user.js")
const passport = require('passport')
const { saveRedirectUrl } = require("../middlewares.js")
const userController = require('../controllers/user.js')

// sign up
router.route("/signup")
.get(userController.renderSignupForm) // signup get
.post(userController.signup) // signup post

// the passport.authenticate middleware will do all validations
// failureRedirect will redirect to the route in case authentication fails
// failureFlash will flash a message in case of failure in authentication

// login
router.route("/login")
.get(userController.renderLoginForm) // login get
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login) // login post

// logout functionality
router.get("/logout", userController.logout)

module.exports = router