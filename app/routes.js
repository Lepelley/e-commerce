const express = require('express')
const passport = require('passport')

const Home = require('../src/controllers/Home')
const UserRegister = require('../src/controllers/UserRegister')
const UserLogin = require('../src/controllers/UserLogin')
const UserLogout = require('../src/controllers/UserLogout')
const ItemList = require('../src/controllers/ItemList')
const ItemShow = require('../src/controllers/ItemShow')
const BasketList = require('../src/controllers/BasketList')
const AdminItemList = require('../src/controllers/AdminItemList')
const ItemEdit = require('../src/controllers/ItemEdit')

const router = express.Router()

router.get('/', (request, response) => (new Home()).print(request, response))
router.get('/register', (request, response) => (new UserRegister()).print(request, response))
router.post('/register', (request, response) => (new UserRegister()).process(request, response))
router.get('/login', (request, response) => (new UserLogin()).print(request, response))
// router.post('/login', (request, response) => (new UserLogin()).process(request, response))
router.get('/logout', (request, response) => (new UserLogout()).process(request, response))

router.post('/login', (request, response) => {
  passport.authenticate(
    'local',
    { successRedirect: '/', failureRedirect: '/login' }
  )(request, response)
})

router.get('/list', (request, response) => (new ItemList()).print(request, response))
router.get('/show/:id', (request, response) => (new ItemShow()).print(request, response))
router.get('/basket', (request, response) => (new BasketList()).print(request, response))

router.get('/admin/list', (request, response) => (new AdminItemList()).print(request, response))
router.get('/admin/edit/:id', (request, response) => (new ItemEdit()).print(request, response))
router.post('/admin/edit/:id', (request, response) => (new ItemEdit()).process(request, response))

module.exports = router
