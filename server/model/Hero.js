const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    avatar: String,
    title: String,
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    scores: {
        difficult: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [{
        name: { type: String },
        icon: { type: String },
        description: { type: String },
    }],
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Good" }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Good" }],
    // 使用推荐
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // partners: [{
    //     hero: {
    //         type: mongoose.SchemaTypes.ObjectId,
    //         ref: "Hero"
    //     },
    //     desc: { type: String }
    // }]
})

module.exports = mongoose.model("Hero", schema);