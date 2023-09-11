const mongoose= require("mongoose");
const topicSchema = mongoose.Schema({

    Nombre_del_tema:
    {
        type:String,
        required:true
    },
    Puntuacion_de_relevancia:
    {
        type:Number,
        required:true
    },

    id_noticia:
    {
        type: String,
        required:true
    },

})

module.exports = mongoose.model("topic", topicSchema)