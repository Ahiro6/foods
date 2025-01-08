const express = require("express")

const router = express.Router()

const { authUser } = require('../middlewares/auth')

const { validateLogin, validateSignup } = require('../middlewares/validate')

const { asyncError } = require('../utils/asyncError')

const userCon = require("../controllers/Users")

router.route("/get/")
    .get(authUser, asyncError(userCon.GetUser))

router.route("/login/")
    .post(validateLogin, asyncError(userCon.Login))

router.route("/signup/")
    .post(validateSignup, asyncError(userCon.Signup))

router.route("/logout/")
    .delete(authUser, asyncError(userCon.Logout))

module.exports = router