const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).send({error: "User is not found."});
        }
        res.send(user);
    } catch (e) {
        res.sendStatus(400).send(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const checkUser = await User.findOne({phone: req.body.phone});
        if (checkUser) {
            return res.status(400).send({error: "Такой номер уже зарегистрирован"});
        }
        if (req.body.fullName === "") {
            return res.status(400).send({error: "Пожалуйста, введите ваше ФИО"});
        }
        if (req.body.phone === "") {
            return res.status(400).send({error: "Пожалуйста, введите ваш номер телефона"});
        }
        if (req.body.mail === "") {
            return res.status(400).send({error: "Пожалуйста, введите почту"});
        }
        if (req.body.password === "") {
            return res.status(400).send({error: "Пожалуйста, введите пароль"});
        }
        if (req.body.sex === "") {
            return res.status(400).send({error: "Пожалуйста, выберите пол"});
        }
        const user = new User({
            fullName: req.body.fullName,
            phone: req.body.phone,
            mail: req.body.mail,
            password: req.body.password,
            role: req.body.role,
            sex: req.body.sex,
            token: ""
        });
        user.generateToken();
        console.log(user)
        await user.save();
        res.send(user);

    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post("/sessions", async (req, res) => {
    const user = await User.findOne({phone: req.body.phone});
    if (!user) {
        return res.status(400).send({error: "Такой номер не найден"});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(400).send({error: "Не верный пароль"});
    }
    user.generateToken();
    await user.save();
    res.send(user);
});

router.delete("/sessions", async (req, res) => {
    const token = req.get("Authorization");
    const success = {message: "Success"};

    if (!token) return res.send(success);
    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    user.save();

    return res.send(success);
});

module.exports = router;
