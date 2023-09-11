const express =require('express')
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user")
const newsRoutes = require("./routes/news")

const app= express();
const port=process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use("/api", userRoutes );
app.use("/api2", newsRoutes );


//routes
app.get("/", (req, res) => {
    res.json("Welcome to my A")
    res.send("Welcome to my API");
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB Atlas")).catch((error) => console.error(error));


app.listen(9000,() => console.log("Server listening on port", port));

