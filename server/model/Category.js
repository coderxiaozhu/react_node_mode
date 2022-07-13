const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    parents: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    }
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parents',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
  
module.exports = mongoose.model("Category", schema);