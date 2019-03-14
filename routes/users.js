const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const transporter = require('../config/mailConfig').hostId
const adminEmail = require('../config/mailConfig').adminEmail
//////////// Validation
const validateLoginInput = require('../validation/loginUser');
const validateRegisterInput = require('../validation/registerUser');
/////////// Import User Schema From model
const User = require('../models/User');
///////////////////////////////////////


















// @route   POST users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  /////////verification userName
    User.findOne({ userName: req.body.userName }).then(user => {
      if (user) {
        errors.userName = 'userName already exists';
        return res.status(400).json(errors);
      } 
       const newUser = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          activation: true,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then( 
                user => {
          if(user.email){
            var mailOptions = {
              from: adminEmail, 
              to: req.body.email,  
              subject: 'Light Rh',
              text: req.body.userName
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
           ////////////////////////////////////////////////////
         };
          res.json(user)
              })
              .catch(err => console.log(err));
          });
        });

    });
  });
// @route   POST users/register
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

  // Find user by userName
  User.findOne({ userName }).then(user => {
    // Check for user
    if (!user) {
      errors.userName = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({res:'connected successfuly'})
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

  module.exports = router;

