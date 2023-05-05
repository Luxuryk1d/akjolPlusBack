const router = require("express").Router();
const User = require("../models/User");
const Review = require("../models/Review")

router.get("/street/:id", async (req,res) => {
    try {
        const review = await Review.find({streetId: req.params.id});
        if (review) {
            res.send(review)
        }
    } catch (e) {
        res.sendStatus(400).send(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await User.findById(req.body.user);
        if (user) {
            const review = new Review({
                user: user.fullName,
                streetId: req.body.streetId,
                description: req.body.description,
            });
            await review.save();
            res.send(review)
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;