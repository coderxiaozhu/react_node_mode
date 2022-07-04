module.exports = app => {
    const express = require('express');
    const inflection = require("inflection")
    const router = express.Router({
        mergeParams: true
    });
    const Couters = require("../../model/Couters");
    // 新建分类
    router.post("/", async (req, res) => {
        const doc = await Couters.findOneAndUpdate({ _id: "userId"}, {$inc: { sequence_value: 1 }}, { new: true });
        const model = await req.Model.create({
            userId: doc.sequence_value,
            name: req.body.name,
            parents: req.body.parents
        });
        res.send(model);
    })

    // 分类列表
    router.get("/", async (req, res) => {
        const items = await req.Model.find().populate('parents').limit(10);
        res.send(items);
    })

    // 编辑分类
    router.get("/:id", async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })

    // 保存编辑分类
    router.put("/:id", async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })

    // 删除分类
    router.delete("/:id", async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })
    
    app.use("/admin/api/rest/:resource", async (req, res, next) => {
        const modelName = inflection.classify(req.params.resource);
        req.Model = require(`../../model/${modelName}`);
        next();
    }, router);
}