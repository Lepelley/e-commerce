const express = require('express')
const Home = require('../src/controllers/Home')
const UserRegister = require('../src/controllers/UserRegister')
const UserLogin = require('../src/controllers/UserLogin')
const UserLogout = require('../src/controllers/UserLogout')

const router = express.Router()

router.get('/', (request, response) => (new Home()).print(request, response))
router.get('/register', (request, response) => (new UserRegister()).print(request, response))
router.post('/register', (request, response) => (new UserRegister()).process(request, response))
router.get('/login', (request, response) => (new UserLogin()).print(request, response))
router.post('/login', (request, response) => (new UserLogin()).process(request, response))
router.get('/logout', (request, response) => (new UserLogout()).process(request, response))

module.exports = router
