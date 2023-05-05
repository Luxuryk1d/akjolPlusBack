const mongoose = require("mongoose");
const {app, port} = require("./app");
const config = require("./config");
const users = require("./app/users");
const review = require("./app/review")
const cors = require("cors");
const express = require("express")

const run = async () => {

    app.use(cors());
    app.use(express.json());
    app.use(express.static("public"));

    await mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

    app.use("/users", users);
    app.use("/review", review);

    console.log("Connected to mongo DB");

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

run().catch(console.log);