const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////creat schema 
module.exports = User = mongoose.model('User',new Schema({

    userName: {
        type : String ,
    },
    email: {
        type : String ,
        required:true,
        unique:'Email already used'
    },
    date: {
        type:Date,
        default:Date.now      
    },
    password: {
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ['Developer','Quality assurance','IT','RH','admin'],
        required:true
    },
    activation:{
        type:Boolean,
    },
    contactEmailPersonnel: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      }
})) 