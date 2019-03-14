var userCrl = require('../controllers/usersControl')
const express = require('express');
const user = express();


user.post('/register',userCrl.postNewUser);
user.post('/login',userCrl.loginUser);




module.exports = user ;