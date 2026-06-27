const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js')

const MONGO_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/wanderlust'

async function initDB() {
    await Listing.deleteMany({})
    const seededListings = initData.data.map((obj) => ({
        ...obj,
        owner: '666f24813ed6412aaa133b55',
    }))
    await Listing.insertMany(seededListings)
}

async function main() {
    await mongoose.connect(MONGO_URL)
    await initDB()
    await mongoose.disconnect()
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
