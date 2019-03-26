const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

 
  data.userName = !isEmpty(data.userName) ? data.userName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.contactEmailPersonnel = !isEmpty(data.contactEmailPersonnel) ? data.contactEmailPersonnel : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.role = !isEmpty(data.role) ? data.role : '';




////////////////userName/////////////

  if (!Validator.isLength(data.userName, { min: 2, max: 30 })) {
     errors.userName = 'Name must be between 2 and 30 characters';
   }
   if (Validator.isEmpty(data.userName)) {
     errors.userName = 'Name field is required';
   }

////////////////Email/////////////
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

////////////////ContactEmailPersonnel/////////////
  if (Validator.isEmpty(data.contactEmailPersonnel)) {
    errors.contactEmailPersonnel = 'Email field is required';
  }

 else if (!Validator.isEmail(data.contactEmailPersonnel)) {
    errors.contactEmailPersonnel = 'Email is invalid';
  }

////////////////Password /////////////


  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

////////////////Password2/////////////

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

//////////////////////////////////////////////////////////////////////
if (Validator.isEmpty(data.role)) {
  errors.role = 'Pick a Role';
}
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
