const mongoose= require("mongoose");

const tickerSchema = mongoose.Schema({
    
    id_ticker:
    {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        required:true
    },
})
const tickerModel = mongoose.model('tickerModel', tickerSchema);
module.exports =mongoose.model("tickerModel", tickerSchema)