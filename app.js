const express = require('express')
const logger = require("morgan");
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config');

const priceComparisonRouter = require('./controllers/priceComparison');

const url = config.MONGODB_URI
console.log('Connecting to MongoDB')

mongoose
    .connect(url)
    .then((res) => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/api/price-comparison', priceComparisonRouter)

app.use('*', (request, response) => {
  response.status(404).json({message: 'Not Valid Url'})
})

module.exports = app