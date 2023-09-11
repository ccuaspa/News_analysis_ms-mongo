const mongoose= require("mongoose");
const topicSchema = mongoose.Schema({
    
    id_tema:
    {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
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
        //ref: 'article',
        required:true
    },
})
const topicModel = mongoose.model('topicModel', topicSchema);
module.exports =mongoose.model("topicModel", topicSchema)