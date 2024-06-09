const express = require('express')
const route = express.Router();

const UserController = require('../controller/authController')

route.post('/register', UserController.register)
route.post('/login', UserController.login);
route.post('/saveprogress', UserController.saveProgress);
route.get('/signout', UserController.signout)

route.get('/progress/:userId', UserController.getProgress);


module.exports = route;

