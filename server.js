const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
var FormData = require('form-data');
const bodyParser= require('body-parser');
var cors = require('cors')
const app = express();
const db = require('./config/config').mongoURL


app.get('/', (req, res) => {
    res.send('Profile work ')
  })
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
////////////////////////////////////ROUTER////
const users = require('./router')
const profile = require('./routes/profile')
app.use('/users',users)
app.use('/routes/profile', profile);
//////middleware call
app.use(morgan('tiny'))


////////////Connection MongoDB///////////////////////
mongoose.connect(db,{useNewUrlParser:true}).then(()=> console.log('MongoDB connect...')).catch(err =>console.log('Error:',err.message))
/////////////////////////////////////////////////////

const port = process.env.port || 1000;
app.listen(port,()=>{console.log(`listening on port:${port} ...`)})