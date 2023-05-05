const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

router.get("/users/:id", async (req, res) => {
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

router.post("/users", async (req, res) => {
    try {
        const checkUser = await User.findOne({phone: req.body.phone});
        console.log(req.body)
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
        if (req.body.town === "") {
            return res.status(400).send({error: "Пожалуйста, введите город"});
        }

        const user = new User({
            fullName: req.body.fullName,
            phone: req.body.phone,
            mail: req.body.mail,
            password: req.body.password,
            role: req.body.role,
            sex: req.body.sex,
            town: req.body.town,
        });
        user.generateToken();
        await user.save();
        res.send(user);

    } catch (e) {
        return res.status(400).send(e);
    }
});
