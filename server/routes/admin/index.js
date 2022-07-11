module.exports = app => {
    const express = require('express');
    const AdminUser = require('../../model/AdminUser');
    const assert = require("http-assert");
    const jwt = require("jsonwebtoken");
    const inflection = require("inflection");
    // 登录中间件
    const authMiddleware = require("../../middleWare/auth");
    const resourceMiddleware = require("../../middleWare/resource")
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
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parents';
        }
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items);
    })

    // 获取编辑信息接口
    router.get("/:id", async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === "Category") {
            queryOptions.populate = "parents";
        }
        const model = await req.Model.findById(req.params.id).setOptions(queryOptions);
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
    
    app.use("/admin/api/rest/:resource", authMiddleware(), resourceMiddleware(), router);

    // 登录接口
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body;
        // 根据用户名去找用户
        const user = await AdminUser.findOne({ username }).select("+password");
        assert(user, 422, "用户不存在");
        // 校验密码
        const isValid = require("bcrypt").compareSync(password, user.password);
        assert(isValid, 422, "密码错误")
        const token = jwt.sign({ id: user._id }, app.get("secret"));
        res.send({token});
    })


    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}