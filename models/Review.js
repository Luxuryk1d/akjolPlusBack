const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ReviewSchema = new Schema ({
    user: {
        type: String,
        required: true,
    },
    streetId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;