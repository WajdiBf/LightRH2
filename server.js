const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const app = express();
const db = require('./config/config').mongoURL
const users = require('./router')
app.use('/users',users)
//////middleware call
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded());
////////////Connection MongoDB///////////////////////
mongoose.connect(db,{useNewUrlParser:true}).then(()=> console.log('MongoDB connect...')).catch(err =>console.log('Error:',err.message))
/////////////////////////////////////////////////////
;
const port = process.env.port || 5000;
app.listen(port,()=>{console.log(`listening on port:${port} ...`)})