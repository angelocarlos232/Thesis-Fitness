const express = require('express')
const route = express.Router();

const UserController = require('../controller/authController')

route.post('/register', UserController.register)
route.post('/login', UserController.login);
route.get('/signout', UserController.signout)

module.exports = route;

