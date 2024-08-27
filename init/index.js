let mongoose = require('mongoose')
let initData = require('./data.js')
let Listing = require('../models/listing.js')


const initDB = async () => {
    await Listing.deleteMany({})
    // ('666f24813ed6412aaa133b55')
    // map() method returns new array
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: '666f24813ed6412aaa133b55',
    }))
    await Listing.insertMany(initData.data)
    console.log('data initialized')
}

initDB()

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}
main().then(() => console.log('database setted up'))