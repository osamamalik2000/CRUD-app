const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Instance of express module
const app = express();
// Libraries used
app.use(cors());
app.use(bodyParser.json());

// Connection to mongoDB
mongoose.connect("mongodb://localhost/CRUD",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema
const userModel = require("./user");

// Requests
app.get("/", (req, res)=>{
    res.send("CRUD is running.");
})

app.post('/api/indata', (req,res)=>{
    let ins = userModel({
        'name': req.body.name,
        'email': req.body.email
    })
    ins.save()
    .then((req,res)=>{
        res.send({msg:"INSERTED"});
    }).catch((err)=>{
        res.send({msg:"CAN NOT INSERT"});
    })
})

app.get('/api/getData', (req,res)=>{
    userModel.find({},(err, data)=>{
        if(err) console.log(err)
        res.send({data:data});
    })
})
app.get('/api/delData/:id', (req, res)=>{
    let id = req.params.id;
    userModel.remove({'_id':id}, (err)=>{
        if(err) throw err;
        res.json({msg:"Deleted"});
    })
})

// Connecting server to a port
app.listen(3000, console.log("Server is running."))