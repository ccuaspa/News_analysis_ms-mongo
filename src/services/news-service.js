const topicModel= require("../models/topic");
const tickerModel= require("../models/ticker");
const articleModel= require("../models/article");

async function getNews() {
    const articles = await articleModel.find().exec();
    let articlesWithFullData = [];
    for (let i = 0; i < articles.length; i++) {
        const topics = await topicModel.find({id_noticia: articles[i]._id}).exec();
        const tickers = await tickerModel.find({id_noticia: articles[i]._id}).exec();

        let DTO = {
            article: articles[i],
            topics: topics,
            tickers: tickers
        }

        articlesWithFullData.push(DTO);
    }

    return articlesWithFullData;
}

async function getNewsByTicker(ticker) {
    const tickers = await tickerModel.find({ticker: ticker}).exec();
    let articlesWithFullData = [];
    for (let i = 0; i < tickers.length; i++) {
        const article = await articleModel.findById(tickers[i].id_noticia).exec();
        const topics = await topicModel.find({id_noticia: tickers[i].id_noticia}).exec();

        let DTO = {
            article: article,
            topics: topics,
            tickers: tickers
        }

        articlesWithFullData.push(DTO);
    }

    return articlesWithFullData;
}

async function saveNewsByTicker(ticker) {
    let request = require('request');


    let apiKey = 'AIESP2IBE8LE8J8X';

    let url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`;

    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, async (err, res, data) => {
        if (err) {
            console.log('Error in Financial news API:', err);
        } else if (res.statusCode !== 200) {
            console.log('Something happened in Financial news API:', res.statusCode);
        } else {

            // Extract and format the data as needed
            for (let i = 0; i < 6/*data.length*/; i++) {

                const formattedArticle = new articleModel({
                    titulo: data.feed[i].title,
                    url: data.feed[i].url,
                    Fecha_de_publicacion: data.feed[i].time_published,
                    Resumen: data.feed[i].summary,
                    imagen_del_banner: data.feed[i].banner_image,
                    fuente: data.feed[i].source,
                    puntuacion_del_sentimiento_general: data.feed[i].overall_sentiment_score,
                    etiqueta_del_sentimiento_general: data.feed[i].overall_sentiment_label,
                })

                const savedArticle = await formattedArticle.save();

                //Get article topics
                for (let j = 0; j < data.feed[i].topics.length; j++) {

                    const formattedTopic = new topicModel({
                        Nombre_del_tema: data.feed[i].topics[j].topic,
                        Puntuacion_de_relevancia: data.feed[i].topics[j].relevance_score,
                        id_noticia: savedArticle._id
                    });

                    formattedTopic.save()
                        .then(savedObject => {
                            console.log('Topic saved');
                        })
                        .catch(error => {
                            console.error('Error saving object:', error);
                        });

                }

                //Get article tickers
                for (let l = 0; l < data.feed[i].ticker_sentiment.length; l++) {

                    const formattedTicker = new tickerModel({
                        ticker: data.feed[i].ticker_sentiment[l].ticker,
                        Puntuacion_de_relevancia: data.feed[i].ticker_sentiment[l].relevance_score,
                        Puntuacion_de_sentimiento: data.feed[i].ticker_sentiment[l].ticker_sentiment_score,
                        etiqueta_del_sentimiento: data.feed[i].ticker_sentiment[l].ticker_sentiment_label,
                        id_noticia: savedArticle._id
                    });

                    formattedTicker.save()
                        .then(savedObject => {
                            console.log('Ticker saved');
                        })
                        .catch(error => {
                            console.error('Error saving object:', error);
                        });
                }
            }
        }
    });

    console.log('News saved for ' + ticker);

}

module.exports = {
    getNews,
    getNewsByTicker,
    saveNewsByTicker
}