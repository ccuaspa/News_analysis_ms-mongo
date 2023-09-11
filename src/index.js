const express =require('express')
const mongoose = require("mongoose");
require("dotenv").config();
const newsRoutes = require("./routes/news")
const {schedule} = require("node-cron");
const {saveNewsByTicker} = require("./services/news-service");

const app= express();
const port=process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use("/api", newsRoutes );


//routes
app.get("/", (req, res) => {
    res.json("Welcome to my API");
    res.send("Welcome to my API");
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB Atlas")).catch((error) => console.error(error));

schedule('0 23 * * *', () => {
    saveNewsByTicker('AAPL').then(r => console.log('News saved'));
});

app.listen(9000,() => console.log("Server listening on port", port));

