const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {nanoid} = import('nanoid');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Поле fullName обязательно для заполнения"],
    },
    phone: {
        type: String,
        required: [true, "Поле phone обязательно для заполнения"],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await User.findOne({phone: value});
                if (user) return false;
            },
            message: (props) => `Номер ${props.value} уже используется`
        }
    },
    mail: {
        type: String,
        required: [true, "Поле email обязательно для заполнения"],
        unique: true,
        validate: {
            validator: async (value) => {
                const user = await User.findOne({email: value});
                if (user) return false;
            },
            message: (props) => `Почта ${props.value} уже используется`
        }
    },
    password: {
        type: String,
        required: [true, "Поле password обязательно для заполнения"],
        minlength: [8, "Минимальная длина пароля 8 символов"],
        validate: {
            validator: (value) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(value);
            },
            message: "Пароль слишком простой"
        }
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "moderator"]
    },
    sex: {
        type: String,
        enum: ["male", "female"]
    },
    town: {
        type: String,
        required: true
    }
});

UserSchema.path("mail").validate(value => {
    return /^[\w-.]+@(\b[a-z-]+\b)[^-].[a-z]{2,10}$/g.test(value);
}, "Введите правильный почтовый ящик");

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

UserSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

