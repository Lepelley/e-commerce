const express = require('express')
const Home = require('../src/controllers/Home')

const router = express.Router()

router.get('/', (request, response) => (new Home()).print(request, response))

module.exports = router
