require('dotenv').config()
const express = require('express')
const server = express()
const cors = require("cors")
const port = process.env.PORT

// * middlewares
const corsOption = {
    origin: [
        'http://127.0.0.1:3000', 
        'http://127.0.0.1:3001', 
        // 'https://ecovision-three.vercel.app', 
        'https://ecovision-frontend.vercel.app'
    ]
};

server.use(cors(corsOption))
server.use(express.json())
server.use(require('./routes/api')) // * Routers

server.get('/', (req, res) => {
    res.json({ message: "It's working!" })
})

server.listen(port, (err) => {
    if(err) throw err

    console.log("Connected to port " + port);
});

module.exports = server
