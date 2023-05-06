const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StreetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number
    }
});

const Street = mongoose.model("Street", StreetSchema);