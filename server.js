require('dotenv').config()
const express = require('express')
const server = express()
const cors = require("cors")
const port = process.env.PORT

// * middlewares
const corsOption = {
    origin: ['http://localhost:3000'],
};

server.use(cors(corsOption))
server.use(express.json())

server.get('/', (req, res) => {
    res.json("hello")
});

server.post('/api/login', (req, res) => {
    res.json(req.body)
});

server.listen(port, (err) => {
    if(err) throw err

    console.log("Connected to port " + port);
});

module.exports = server