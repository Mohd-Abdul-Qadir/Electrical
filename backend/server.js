const {connectToMongoDB} = require('./config/db') 
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('',require('./routes/api'))

connectToMongoDB()

app.listen('4040')
