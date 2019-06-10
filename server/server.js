const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user = require('./model/user');

const port = process.env.PORT ? process.env.PORT : 3000;
const db = 'mongodb://localhost:27017/mean';
mongoose.connect(db, {useNewUrlParser: true});

const app = express();
app.use(bodyParser.json());

app.post('/register', (req,res)=>{    
    var newUser = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    var userdata = new user(newUser);
    userdata.save().then((x)=>{
        res.send(x);
    }).catch((e)=>{
        res.send(e);
    })
});


app.post('/login', (req,res)=>{
    var userGet = {
        email: req.body.email,
        password: req.body.password
    }
    user.findOne(userGet).then((x)=>{
       res.send(x);       
    }).catch((e)=>{
        res.send(e);
    });
});

app.listen(3000, ()=>{
    console.log('server is running on 3000');
});
