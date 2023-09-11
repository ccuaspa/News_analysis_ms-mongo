const mongoose= require("mongoose");

const tickerSchema = mongoose.Schema({

    ticker:
    {
        type:String,
        required:true
    },
    Puntuacion_de_relevancia:
    {
        type:Number,
        required:true
    },
    Puntuacion_de_sentimiento:
    {
        type:Number,
        required:true
    },
    etiqueta_del_sentimiento:
    {
        type:String,
        required:true
    },
    id_noticia:
    {
        type: String,
        // ref: 'article',
        required:true
    },
})
module.exports = mongoose.model("ticker", tickerSchema)