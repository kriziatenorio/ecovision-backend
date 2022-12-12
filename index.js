require('dotenv').config()
const express = require('express')
const server = express()
const cors = require("cors")
const port = process.env.PORT

// * middlewares
const corsOption = {
    origin: ['http://127.0.0.1:3000', 'https://ecovision-three.vercel.app']
};

server.use(cors(corsOption))
server.use(express.json())

// Routes
// const listingsController = require('./controllers/listingsController')
const usersController = require('./controllers/UsersController')
// server.use('/api/listings', listingsController)
server.use('/api/users', usersController)

server.get('/', (req, res) => {
    res.json({
        message: "It's working!"
    })
})

server.listen(port, (err) => {
    if(err) throw err

    console.log("Connected to port " + port);
});

module.exports = server
