const express= require("express");
const articleSchema = require("../models/article");
const topicSchema = require("../models/topic");
const tickerSchema = require("../models/ticker");
const topicModel= require("../models/topic");
const tickerModel= require("../models/ticker");
const articleModel= require("../models/article");

const router= express.Router();

//Save all news
router.get("/news", (req, res)=>{
    //get news
    'use strict';
    var request = require('request');

    // Replace 'YOUR_API_KEY' with your actual API key from Alpha Vantage
    var apiKey = 'AIESP2IBE8LE8J8X';
    var ticker = 'AAPL'; // You can change the stock ticker as needed

    var url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`;

    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, async (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            var k=0;
            var m=0;
            // Extract and format the data as needed
            for (var i=0; i<6/*data.length*/;i++){
                const formattedArticle= new articleModel({
                    //id: i+1,
                    titulo: data.feed[i].title,
                    url: data.feed[i].url,
                    fecha_de_publicacion: data.feed[i].time_published,
                    resumen: data.feed[i].summary,
                    imagen_del_banner: data.feed[i].banner_image,
                    fuente: data.feed[i].source,
                    puntuacion_del_sentimiento_general: data.feed[i].overall_sentiment_score,
                    etiqueta_del_sentimiento_general: data.feed[i].overall_sentiment_label,
                })
                //console.log(formattedArticle);
                //Get article topics
                for (var j=0; j<data.feed[i].topics.length; j++){
                    const formattedTopic= new topicModel({
                        id_tema:
                        'ObjectIdValue',
                        Nombre_del_tema:data.feed[i].topics[j].topic,

                        Puntuacion_de_relevancia:data.feed[i].topics[j].relevance_score,
                    });
                    formattedTopic.save() .then(savedObject => {console.log('Object saved to database:', savedObject);
                 }).catch(error => {console.error('Error saving object:', error);});
                    /*
                    const formattedTopic={
                        //id_tema: new ObjectID(),

                        nombre_del_tema:data.feed[i].topics[j].topic,

                        puntuacion_de_relevancia:data.feed[i].topics[j].relevance_score,

                        //id_noticia: i+1,
                    }
                    */
                    /*
                    const connection = await getConnection();
                    await connection.query("INSERT INTO tema SET ?", formattedTopic);
                    */
                    //const topic =topicSchema(formattedTopic);
                    //topic.save()//.then((data) => res.json(data)).catch((error)=> res.json({message:error}));
                    k=k+1;
                }

                //Get article tickers
                for (var l=0; l<data.feed[i].ticker_sentiment.length; l++){
                    const formattedTicker= new tickerModel({
                        id_ticker: 'ObjectIdValue',

                        ticker:data.feed[i].ticker_sentiment[l].ticker,

                        Puntuacion_de_relevancia:data.feed[i].ticker_sentiment[l].relevance_score,

                        Puntuacion_de_sentimiento:data.feed[i].ticker_sentiment[l].ticker_sentiment_score,

                        etiqueta_del_sentimiento:data.feed[i].ticker_sentiment[l].ticker_sentiment_label,

                        //id_noticia: i+1,
                    })
                    /*
                    const connection = await getConnection();
                    await connection.query("INSERT INTO empresas_relacionadas SET ?", formattedTicker);
                    */
                    formattedTicker.save() .then(savedObject => {console.log('Object saved to database:', savedObject);
                 }).catch(error => {console.error('Error saving object:', error);});
                    m=m+1;
                }
                /*Check all the information related to the article

                const formattedFullData = {
                    title: data.feed[i].title,
                    url: data.feed[i].url,
                    time_published: data.feed[i].time_published,
                    summary: data.feed[i].summary,
                    banner_image: data.feed[i].banner_image,
                    source: data.feed[i].source,
                    category_within_source: data.feed[i].category_within_source,
                    source_domain: data.feed[i].source_domain,
                    topics: data.feed[i].topics,
                    overall_sentiment_score: data.feed[i].overall_sentiment_score,
                    overall_sentiment_label: data.feed[i].overall_sentiment_label,
                    ticker_sentiment: data.feed[i].ticker_sentiment,
                };
                console.log(formattedFullData);
                */

            //const connection = await getConnection();
            //await connection.query("INSERT INTO noticia SET ?", formattedArticle);
            }
        }
    });


    //article save
    
    formattedArticle.save() .then(savedObject => {console.log('Object saved to database:', savedObject);
                 }).catch(error => {console.error('Error saving object:', error);});

    //save topic
    /*
    const topic =topicSchema(req.body);
    topic.save().then((data) => res.json(data)).catch((error)=> res.json({message:error}));
    */

    //save ticker
    /*
    const ticker =tickerSchema(req.body);
    ticker.save().then((data) => res.json(data)).catch((error)=> res.json({message:error}));
    */
});

module.exports = router;
