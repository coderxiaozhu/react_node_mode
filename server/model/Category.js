const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: Number,
    name: String,
    parents: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    }
})

module.exports = mongoose.model("Category", schema);