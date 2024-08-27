if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}


const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js")
const flash = require("connect-flash")
const bodyParser = require('body-parser')

app.use(methodOverride('_method'))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true })); // Use extended: false for simple data
app.engine("ejs", ejsMate)

const dbUrl = process.env.MONGODB_URL

// authentication using passport
const User = require("./models/user.js")
const passport = require('passport')
const LocalStrategy = require("passport-local")

// routes
const listingRouter = require('./routes/listing.js')
const reviewRouter = require('./routes/review.js')
const userRouter = require("./routes/user.js")

//session
const session = require('express-session')
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,     // required to add
    },
    touchAfter: 24 * 3600,
})

store.on("error", () => {
    console.log("ERROR in storing session in store.")
})

let sessionOptions = {
    store,
    secret: process.env.SECRET,     // required to add
    resave: false,              // remove warnings and vulnerabilities
    saveUninitialized: true,    // remove warnings and vulnerabilities
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,   // for 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,     // to prevent XSS attacks
    },
}



app.use(session(sessionOptions))
// sessions are must have to use flash messages
app.use(flash())

// authentication using passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
// converts user object into a form that is storeable in session( typically a new ID)
passport.serializeUser(User.serializeUser())
// converts the seriealized data stored in session to full user object (the actual form)
passport.deserializeUser(User.deserializeUser())



// flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next();
})

app.use("/listings", listingRouter)
app.use("/listings/:id/review/", reviewRouter)
app.use("/", userRouter)

// middleware to handle errors
app.use((err, req, res, next) => {
    let { statusCode, message } = err
    res.status(statusCode).send(message)
})


// when the query string is entered, it will be matched with the mentioned route. if route not found, the query string is gonna return the below app.all() method which is now generating an error message.

// always use at the end of file
app.all("*", (req, res, next) => {
    let error = new ExpressError(404, "Sorry Sir, Page Not Found!")
    res.render("error.ejs", {error})
    // next(error)
})

async function main() {
    await mongoose.connect(dbUrl)
}
main().then(() => console.log('database setted up')).catch(() => console.log('database error'))

app.listen(3000, () => {
    console.log('server is running');
})