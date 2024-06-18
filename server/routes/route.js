const express = require('express');
const route = express.Router();

const UserController = require('../controller/authController');

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/saveprogress', UserController.saveProgress);
route.get('/signout', UserController.signout);
route.post('/savephoto/:userId', UserController.savePhoto);

route.get('/progress/:userId', UserController.getProgress);
route.get('/users', UserController.getUsers); // New endpoint to get the list of users
route.get('/users/:userId/photo', UserController.getUserPhoto); // New endpoint to get the user's photo
route.post("/api/users/login-with-id", UserController.loginWithId);
route.post('/addcalories', UserController.addCalories)
route.post('/weightLog', UserController.weightLog)

module.exports = route;
