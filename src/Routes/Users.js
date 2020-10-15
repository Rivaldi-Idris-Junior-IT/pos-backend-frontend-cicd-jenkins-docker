const express = require('express')
// Import file Product.js di folder controller
const validate = require('../Middleware/validate')
const chache = require('../Middleware/chache')
const controller = require('../Controller/Users')
const Routes = express.Router()

// Import untuk Users
Routes.get("/", controller.all)
Routes.post("/", chache, controller.add)
Routes.get("/get",  chache, controller.getbyuser)
Routes.put("/", chache, controller.editToken)
Routes.delete("/", controller.delete)

module.exports = Routes