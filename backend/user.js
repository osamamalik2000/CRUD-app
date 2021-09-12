const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    product :String,
    quantity : Number
})

module.exports = mongoose.model("user", userSchema);