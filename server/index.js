const express = require("express");

const app = express();

app.use(express.json());
app.use(require('cors')());

app.set("secret", "yqweihsodoadaks");

app.use("/uploads", express.static(__dirname + "/uploads"));
    // 上传图片
    const multer = require("multer");
    const path = require("path");
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/uploads`);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
    const upload = multer({
        storage
    });
    app.post('/admin/api/upload', upload.single('file'), (req, res, next) => {
        const file = req.file;
        file.url = `http://localhost:3001/uploads/${file.filename}`;
        res.send(file); 
    })
    
require("./routes/admin")(app);
require("./plugins/db")(app);
require("./routes/web")(app);

app.listen(3001, () => {
    console.log("服务端在3001端口启动");
})