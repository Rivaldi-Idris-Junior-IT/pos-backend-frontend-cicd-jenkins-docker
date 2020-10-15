const express = require('express')
// Import file Product.js di folder controller
const controller = require('../Controller/Category')
const Routes = express.Router()

Routes.get("/", controller.all)
Routes.get("/search/:nama_kategori", controller.search)
Routes.post("/", controller.add)
Routes.put("/", controller.edit)
Routes.delete("/", controller.delete)

module.exports = Routes