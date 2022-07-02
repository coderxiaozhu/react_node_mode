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

    // 编辑分类
    router.get("/categorise/:id", async (req, res) => {
        const model = await Category.findById(req.params.id);
        res.send(model);
    })

     // 保存编辑分类
     router.put("/categorise/:id", async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })
    
    app.use("/admin/api", router);
}