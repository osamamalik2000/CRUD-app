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
        product: req.body.product,
        quantity: req.body.quantity
    })
    ins.save()
    .then(()=>{
        res.json({msg:"INSERTED"});
    }).catch((err, doc)=>{
        if(err){throw err}
        else{res.json({msg: doc})}
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
    { $set: {product: req.body.product, quantity: req.body.quantity}},
    { new: true},
    (err)=>{
       if(err) throw err
       res.json({msg:"Updated"});
        }
    )
})

// Connecting server to a port
port = process.env.PORT || 3000;
app.listen(port, console.log("Server is running."))