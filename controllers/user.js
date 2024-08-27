const User = require("../models/user.js")

module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signup = async (req, res, next) => {
    let { username, email, password } = req.body
    let user = new User({
        username, email
    })
    let newUser = await User.register(user, password)

    // automatically login after signup
    req.login(newUser, (err) => {
        if (err) return next(err)
        else {
            req.flash('success', "welcome to wanderlust")
            res.redirect("/listings")
        }
    })
}

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs")
}

module.exports.login = async (req, res) => {
    req.flash("success", "welcome back sir")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}
module.exports.logout =  (req, res, next) => {
    req.logout((err => {
        if (err) {
            return next(err)
        }
        else {
            req.flash('success', "successfully logged out")
            res.redirect('/listings')
        }
    }))
}