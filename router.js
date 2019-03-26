const express = require('express');
const router = express.Router();

var userCrl = require('./controllers/usersControl')





/*  */ /* test Routes {path + bodys} */
const test = router.use((req, res, next) => {
    console.log('Called test path from root : '+'\n'+ req.path,'\n')
    next()
  })
const tests = router.use((req, res, next) => {
    console.log('Called test body from root: '+'\n', req.body ,'\n')
    next()
  })
          if(test.path){console.log(test)}
          if(tests.body){console.log(test)}

/* ----------------------------------------------------------------- */










router.post('/add',userCrl.postNewUser);
router.post('/login',userCrl.loginUser);
router.post('/getAllUsers',userCrl.listAllUser);



// const usersRouter = require('./routes/usersRoutes');

 


module.exports = router;