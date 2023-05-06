const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    street: {
        type: Schema.Types.ObjectId,
        ref: "Street",
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
});

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
