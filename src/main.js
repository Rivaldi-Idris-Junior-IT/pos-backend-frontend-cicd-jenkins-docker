const express = require('express')
// Import File Product.js pada folder Routes
const product = require('./Routes/Product')
const category = require('./Routes/Category')
const users = require('./Routes/Users')
const auth = require ('./Routes/Auth')
const history = require('./Routes/History')

const Routes = express.Router()

// Tampung hasil import file Product.js pada folder Routes
Routes.use("/product",product)

// Tampung hasil import file Category.js pada folder Routes
Routes.use("/category", category)

// Tampung hasil import file History.js pada folder Routes
Routes.use("/history", history)

// Tampung hasil import file Users.js pada folder Routes
Routes.use("/users", users)

Routes.use("/auth", auth)


// Export file Main.js
module.exports = Routes