module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require("../../model/Category");
    const Couters = require("../../model/Couters");
    // 新建分类
    router.post("/categorise", async (req, res) => {
        const doc = await Couters.findOneAndUpdate({ _id: "userId"}, {$inc: { sequence_value: 1 }}, { new: true });
        const model = await Category.create({
            userId: doc.sequence_value,
            name: req.body.name
        });
        res.send(
            {
                message: "添加成功"
            }
        );
    })

    // 分类列表
    router.get("/categorise", async (req, res) => {
        const items = await Category.find().limit(10);
        res.send(items);
    })
    
    app.use("/admin/api", router);
}