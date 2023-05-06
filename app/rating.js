const router = require("express").Router();
const Rating = require('../models/Rating');

router.post("/", async (req, res) => {
    const ratingData = req.body;
    let findRating = {$and: [{user: req.body.user}, {lawyer: req.body.lawyer}, {answer: req.body.answer}]};
    const result = await Rating.find(findRating);
    const rating = new Rating(ratingData);
    if (result.length === 0) {
        try {
            await rating.save();
            res.send(rating);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        const newResult = await Rating.findOneAndUpdate(findRating, {$set: {rate: req.body.rate}});
        if (newResult) {
            res.send({message: 'Success'});
        } else {
            res.sendStatus(404);
        }
    }
});

router.get("/", async (req, res) => {
    const ratings = await Rating.find();
    if (ratings) {
        res.send(ratings);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
