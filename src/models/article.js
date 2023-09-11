const mongoose= require("mongoose");

const articleSchema = mongoose.Schema({

    titulo:
    {
        type:String,
        required:true
    },
    url:
    {
        type:String,
        required:true
    },
    Fecha_de_publicacion:
    {
        type:String,
        required:true
    },
    Resumen:
    {
        type:String,
        required:true
    },
    imagen_del_banner:
    {
        type:String,
        required:true
    },
    fuente:
    {
        type:String,
        required:true
    },
    puntuacion_del_sentimiento_general:
    {
        type: Number,
        required:true
    },
    etiqueta_del_sentimiento_general:
    {
        type:String,
        required:true
    },
})

module.exports = mongoose.model("article", articleSchema)