const express = require("express")
const server = express()

// Routes
// const listingsController = require('../controllers/listingsController')
const usersController = require('../controllers/UsersController')
// server.use('/api/listings', listingsController)
server.use('/api/users', usersController)

module.exports = server