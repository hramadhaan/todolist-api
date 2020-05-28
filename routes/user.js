const express = require("express");
const { check } = require("express-validator/check");
const User = require("../models/user");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const userController = require("../controllers/user");

router.post(
    "/register", [
        check("email")
        .isEmail()
        .withMessage("Harap Masukkan E-Mail yang benar")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject("Email telah digunakan");
                }
            });
        }),
        check("password")
        .isLength({ min: 5 })
        .withMessage("Password harus lebih dari 5 karakter"),
    ],
    userController.register
);

router.post(
    "/login", [
        check("email").isEmail().withMessage("Harap Masukkan E-Mail yang benar"),
        check("password")
        .isLength({ min: 5 })
        .withMessage("Password harus lebih dari 5 karakter"),
    ],
    userController.login
);

router.get("/profile/:id", isAuth, userController.profile);

module.exports = router;