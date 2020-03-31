const express = require('express')
const Home = require('../src/controllers/Home')
const Register = require('../src/controllers/UserRegister')

const router = express.Router()

router.get('/', (request, response) => (new Home()).print(request, response))
router.get('/register', (request, response) => (new Register()).print(request, response))
router.post('/register', (request, response) => (new Register()).process(request, response))

module.exports = router
