module.exports = app => {
    const express = require('express');
    const inflection = require("inflection")
    const router = express.Router({
        mergeParams: true
    });
    // 新建接口
    router.post("/", async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    })

    // 获取列表接口
    router.get("/", async (req, res) => {
        const items = await req.Model.find().populate('parents').limit(10);
        res.send(items);
    })

    // 获取编辑信息接口
    router.get("/:id", async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })

    // 保存编辑信息接口
    router.put("/:id", async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })

    // 删除接口
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