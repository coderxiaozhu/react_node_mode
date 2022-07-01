const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: Number,
    name: String
})

module.exports = mongoose.model("Category", schema);