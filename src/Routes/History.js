const express = require('express')
// Import file Product.js di folder controller
const controller = require('../Controller/History')
const Routes = express.Router()

Routes.get("/", controller.all)
Routes.post("/", controller.add)
Routes.put("/", controller.edit)
Routes.delete("/", controller.delete)
Routes.get("/search/:cashier", controller.search)

module.exports = Routes