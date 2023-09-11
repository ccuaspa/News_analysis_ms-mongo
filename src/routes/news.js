const express = require("express");
const {getNews, getNewsByTicker, saveNewsByTicker} = require("../services/news-service");

const router = express.Router();

//Save all news
/*router.get("/news/:ticker", async (req, res) => {
    //get news
    await saveNewsByTicker(req.params.ticker)
    res.send("News saved");

});*/

router.get("/news", async (req, res) => {
    let response = await getNews();
    res.json(response);
});

router.get("/news/:ticker", async (req, res) => {
    let response = await getNewsByTicker(req.params.ticker);
    res.json(response);
});

module.exports = router;
