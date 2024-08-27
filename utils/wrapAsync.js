module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

// wrapAsync method works same as try catch block but more efficiently