const nodemailer = require('nodemailer')

const userMail ='benftimawajdii@gmail.com'
const passMail ='123sambaawajdii'
const adminMail = 'benftimawajdii@gmail.com'










var hostId = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    port:25,
    auth: {
          user: userMail,
          pass: passMail
      },
    tls: {
          rejectUnauthorized:false
      }
  })


  module.exports = {
      hostId,
    adminEmail:adminMail}
  
  ;