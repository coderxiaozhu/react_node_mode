const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    categories:[{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    body: String
})

module.exports = mongoose.model("Article", schema);