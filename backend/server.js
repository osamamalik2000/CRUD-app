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
    useFindAndModify: true
});

// Schema
const userModel = require("./user");

// Request for testing api
app.get("/", (req, res)=>{
    res.send("CRUD is running.");
})
// Api for saving data
app.post('/api/indata', (req,res)=>{
    const ins = new userModel({
        name: req.body.name,
        email: req.body.email
    })
    ins.save()
    .then((req,res)=>{
        res.send({msg:"INSERTED"});
    }).catch((err)=>{
        res.send({err:err});
    })
})
// Api for fetching data
app.get('/api/getData', (req,res)=>{
    userModel.find({},(err, data)=>{
        if(err) console.log(err)
        res.send({data:data});
    })
})
// Api for deleting data
app.get('/api/delData/:id', (req, res)=>{
    userModel.findByIdAndDelete(req.params.id , (err)=>{
        if(err) throw err
        res.json({msg:"Deleted"});
    })
})
// Api for updating data
app.put('/api/updData/:id', (req, res)=>{
    userModel.findByIdAndUpdate(req.params.id, 
    { $set: {name: req.body.name, email: req.body.email}},
    { new: true},
    (err)=>{
       if(err) throw err
        }
    )
})

// Connecting server to a port
app.listen(3000, console.log("Server is running."))