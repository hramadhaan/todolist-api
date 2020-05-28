const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
    const nama = req.body.nama;
    const noTelp = req.body.noTelp;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "Salah dalam validasi",
            errors: errors.array()[0].msg,
        });
    }

    bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
            const user = new User({
                nama: nama,
                noTelp: noTelp,
                email: email,
                password: hashedPw,
            });
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "Sukses",
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.json({
                    message: "User tidak ada",
                });
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                res.json({
                    message: "Password tidak sama",
                });
            }

            const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString(),
                },
                "somesecretsecrettoken"
            );
            res.status(200).json({
                token: token,
                data: loadedUser,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.profile = (req, res, next) => {
    const id = req.params.id;

    User.findOne({ _id: id })
        .select("_id nama noTelp email")
        .then((result) => {
            res.status(200).json({
                message: "Sukses",
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};