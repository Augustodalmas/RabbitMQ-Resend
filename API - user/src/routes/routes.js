const express = require('express')
const routes = express.Router()

require('./userRoute')(routes)

module.exports = routes