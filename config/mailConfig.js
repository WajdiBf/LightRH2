const nodemailer = require('nodemailer')


var hostId = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    port:25,
    auth: {
          user: 'benftimawajdii@gmail.com',
          pass: '123sambaawajdii'
      },
    tls: {
          rejectUnauthorized:false
      }
  })


  module.exports = {
      hostId,
    adminEmail:'benftimawajdii@gmail.com'}
  
  ;