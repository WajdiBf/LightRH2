const express = require('express');
const router = express.Router();

var userCrl = require('./controllers/usersControl')


router.post('/register',userCrl.postNewUser);
router.post('/login',userCrl.loginUser);



// const usersRouter = require('./routes/usersRoutes');

 


module.exports = router;