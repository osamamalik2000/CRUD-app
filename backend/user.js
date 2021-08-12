const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name : String,
    email : {
        type: String,
        Unique: true
    }
})

module.exports = mongoose.model("user", userSchema);