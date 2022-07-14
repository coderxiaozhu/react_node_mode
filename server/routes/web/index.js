module.exports = app => {
    const router = require('express').Router();
    const mongoose = require('mongoose');
    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
    const Hero = mongoose.model('Hero');
    const Ad = mongoose.model("Ad")
    // 新闻资讯的接口
    router.get("/news/list", async (req, res) => {
        const parents = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            { $match: { parents: parents._id } },
            {
              $lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: 'categories',
                as: 'newsList'
              }
            }
        ])
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name;
                return news
            })
        })
        res.send(cats);
    })
     // 英雄列表接口
    router.get('/heroes/list', async (req, res) => {
        const parents = await Category.findOne({
            name: '英雄分类'
        })
        const heroCats = await Category.aggregate([
            { $match: { parents: parents._id } },
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList'
                }
            }
        ])
        res.send(heroCats)
    });
    // 文章详情
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
        categories: { $in: data.categories }
        }).limit(2)
        res.send(data)
    })
    // 广告位接口
    router.get("/adlist", async (req, res) => {
        const data = await Ad.find({
            name: "广东东软学院"
        })
        res.send(data)
    })
    // 英雄信息接口
    router.get('/heroes/:id', async (req, res) => {
        const data = await Hero
          .findById(req.params.id)
          .populate('categories items1 items2')
          .lean()
        res.send(data)
    })
    app.use("/web/api", router);
}