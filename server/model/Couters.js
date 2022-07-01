const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
})

module.exports = mongoose.model("Couters", schema);