const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var fs = require('fs');
const multer = require('multer');


// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + Date.now())
	}
  })
   
  var upload = multer({ storage: storage })
  
// Load User Model
const User = require('../models/User');
const Profile = require('../models/Profile');

/*
router.get("/all", (req, res) => {
  const errors = {};
	Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => {
      res.status(404).json({ profile: "There are no profiles" });
    });
});

*/

router.get('/getProfile' , (req,res) => {
	console.log(req.path)
	Profile.find()
	.then(profiles => res.json(profiles));
});
/*
router.get(
  "/",
  (req, res) => {
    const errors = {};
    // get current user
    Profile.findOne({user: req.params.user_id})
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(errors));
  }
);
*/


/*

router.get('/:user_id',async (req, res) => {
	const errors = {};
					const profile = await Profile.find({_id: req.params.user_id})
					if (!profile) {
		 errors.noprofile = 'There is no profile for this user';
		 res.status(404).json(errors);
			}
					res.json(profile);
		});
	*/


//@routePost api/user
router.post('/', upload.single('image'), (req, res) => {
	
	const newProfile = new Profile({
		user: req.body.user,
		Last_name: req.body.Last_name,
		First_name: req.body.First_name,
		Prof_mail: req.body.Prof_mail,
		Birth_date: req.body.Birth_date,
		Id_card: req.body.Id_card,
		Bank_dtl: req.body.Bank_dtl,
		Bank: req.body.Bank,
		Agency: req.body.Agency,
		Civil_stt: req.body.Civil_stt,
		Child_nb: req.body.Child_nb,
		Resto_tickt: req.body.Resto_tickt
	});
//	newProfile.image = {};
	//newProfile.image.data = fs.readFileSync(req.file.path);
	//var encode_image = newProfile.image.data.toString('base64');
//save to database
/*	var finalImg = {
		contentType: req.file.mimetype,
		image:  new Buffer.from(encode_image, 'base64')
	 };
    db.collection('quotes').insertOne(finalImg, (err, result))
  */

	newProfile.save().then(profile => res.json(profile));
});

/*


router.put('/', async (req, res) => {
	const profile = await Profile.findOneAndUpdate(req.params.id,
		
	 { Last_name: req.body.Last_name },
	 { First_name: req.body.First_name },
	 { Prof_mail: req.body.Prof_mail },
	 { Birth_date: req.body.Birth_date },
	 { Id_card: req.body.Id_card },
	 { Bank_dtl: req.body.Bank_dtl },
	 { Bank: req.body.Bank },
	 { Agency: req.body.Agency },
	 { Civil_stt: req.body.Civil_stt },
	 { Child_nb: req.body.Child_nb },
	 { Resto_tickt: req.body.Resto_tickt
	}, { new: true });
 
  if (!profile) return res.status(404).send('The profile with the given ID was not found.');
  res.send(profile);
});

*/












// @desc    Get current user's profile
// @access  private
router.get(
 '/current',
 (req, res) => {
   const errors = {};

        // get current user
        Profile.findOne({user: req.params.user_id})
     .then(profile => {
       if (!profile) {
         errors.noProfile = "There is no profile for this user";
         return res.status(404).json(errors);
       }

       res.json(profile);
     })
     .catch(err => res.status(404).json(errors));
 }
);
module.exports = router;