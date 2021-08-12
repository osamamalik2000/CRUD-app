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

app.post('/data', (req,res)=>{
    let ins = userModel({
        'name': req.body.name,
        'email': req.body.email
    })
    ins.save()
    .then((res)=>{
        res.send("INSERTED");
    }).catch((err)=>{
        console.log(err);
        res.send("CAN NOT INSERT");
    })
})

// Connecting server to a port
app.listen(3000, console.log("Server is running."))