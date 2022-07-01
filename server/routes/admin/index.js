module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require("../../model/Category");
    router.post("/categorise", async (req, res) => {
        const model = await Category.create(req.body);
        res.send(
            {
                message: "添加成功"
            }
        );
    })
    
    app.use("/admin/api", router);
}