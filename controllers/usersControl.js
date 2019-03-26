
const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const transporter = require('../config/mailConfig').hostId
const adminEmail = require('../config/mailConfig').adminEmail
//////////// Validation
const validateLoginInput = require('../validation/loginUser');
const validateRegisterInput = require('../validation/registerUser');
/////////// Import User Schema From model
const User = require('../models/User');
/////////Exports Controllers Functions /////////////////
module.exports=
{       /* Ajouter User */
    postNewUser:(req, res) => {
      ////////////test console
      console.log('----------------------------------------------')
          console.log('Test From  postNewUser function '+'\n',req.body,'\n')
      /////////////
         const { errors, isValid } = validateRegisterInput(req.body);
        // Check Validation
         if (!isValid) {
           return res.status(400).json(errors);
         }
      /////////verification email
        User.findOne({ email: req.body.email }).then(user => {
          if (user) {
            console.log('user detected')
            errors.email = 'email already exists';
            return res.status(400).json(errors);
          } 
          const avatar = gravatar.url(req.body.contactEmailPersonnel, {
            s: "60", //size of the image
            r: "pg", //rating of the image (for preventing nudity, etc.)
            d: "mm" // default image if user does not have a gravatar
          })
           const newUser = new User({

/* clé Prem Fetch */email: req.body.email,
                    userName: req.body.userName, 
                    contactEmailPersonnel: req.body.contactEmailPersonnel,
                    password: req.body.password,
                    role: req.body.role,
                    activation: true,
                    avatar:avatar,
            });
            ////////les input emta3 el sendMail
            sendName=req.body.email;
            sendPassword=req.body.password;
            //////////////////////////////////
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
                  to: req.body.contactEmailPersonnel,  
                  subject: 'Light Rh',
                  text: 'User name :'+'\n' +sendName+'\n'+'Password :'+'\n'+sendPassword
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
    
        })},

         /*  Login user from backend */
    loginUser:(req, res) => {
        const { errors, isValid } = validateLoginInput(req.body);
      
        // Check Validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
      
        const email = req.body.email;
        const password = req.body.password;
      
        // Find user by userName
        User.findOne({ email }).then(user => {
          // Check for user
          if (!user) {
            errors.email = 'User not found';
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
      },


    listAllUser:(req,res) => {

/* res.status(200).json(res) */ 
       User.find()
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(400).json(err))
      

    }











}

  