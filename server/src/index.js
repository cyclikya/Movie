const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const router = require('./routrer/index.js')
require('dotenv').config();


const PORT = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
        app.listen(PORT, () => console.log('Server running'))
    } catch (e) {
        console.log(e)
    }  
}

start()

