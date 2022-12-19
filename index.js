require('dotenv').config()
const express = require('express')
// const fileUpload = require('express-fileupload')

const server = express()
const cors = require("cors")
const port = process.env.PORT

// * middlewares
const corsOption = {
    origin: ['http://127.0.0.1:3000', 'https://ecovision-three.vercel.app']
};

// server.use(fileUpload())
server.use(cors(corsOption))
server.use(express.static('public'))
server.use(express.json())
// server.use(express.urlencoded({extended: true}))
server.use(require('./routes/api')) // * Routers

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
