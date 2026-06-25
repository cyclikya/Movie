const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const router = require('./routrer/index.js')
const sequelize = require('./db.js')
require('dotenv').config();


const PORT = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        
        console.log('DB connected')
        app.listen(PORT, () => console.log('Server running'))
    } catch (e) {
        console.log(e)
    }
}

start()

