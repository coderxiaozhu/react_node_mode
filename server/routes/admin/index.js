module.exports = app => {
    const express = require('express');
    const AdminUser = require('../../model/AdminUser');
    const assert = require("http-assert");
    const jwt = require("jsonwebtoken");
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
    router.get("/", async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(" ").pop();
        assert(token, 401, "请先登录");
        // 解密
        const { id } = jwt.verify(token, app.get("secret"));
        assert(id, 401, "请先登录");
        req.user = await AdminUser.findById(id);
        assert(req.user, 401, "请先登录");
        await next();  
    }, async (req, res) => {
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

    // 登录接口
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body);
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