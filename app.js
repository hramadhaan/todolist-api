// FOR PACKAGE
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// FOR FILES
const userRoutes = require("./routes/user");
const todolistRoutes = require("./routes/todolist");

// FOR INISIASI
const app = express();

app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(userRoutes);
app.use("/todolist", todolistRoutes);

mongoose
    .connect(
        "mongodb+srv://hramadhaan:Hanief579@cluster-hanif-xi135.gcp.mongodb.net/todolist", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((result) => {
        console.log("Connected");
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });