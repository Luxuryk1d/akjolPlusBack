const mongoose = require("mongoose");
const {app, port} = require("./app");
const config = require("./config");
const users = require("./app/users");

const run = async () => {

    await mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});
    app.use("/users", users);

    console.log("Connected to mongo DB");

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

run().catch(console.log);