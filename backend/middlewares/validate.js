const { param, body, validationResult } = require('express-validator')
const AppError = require('../utils/AppError')

const validateLogin = [
    body('username')
        .notEmpty().withMessage('Must provide a Username')
        .isString().withMessage('Username must be a string')
        .escape().withMessage('Program injections are forbidden'),
    body('password')
        .notEmpty().withMessage('Must provide a Password')
        .isString().withMessage('Password must be a string')
        .escape().withMessage('Program injections are forbidden'),

    (req, res, next) => {
        const result = validationResult(req)

        if (!result.isEmpty()) throw new AppError(result.array()[0].msg, 401)

        next()
    }
]

const validateSignup = [
    body('username')
        .notEmpty().withMessage('Must provide a Username')
        .isString().withMessage('Username must be a string'),
    body('firstname')
        .notEmpty().withMessage('Must provide a Firstname')
        .isString().withMessage('Firstname must be a string'),
    body('surname')
        .notEmpty().withMessage('Must provide a Surname') 
        .isString().withMessage('Surname must be a string'),
    body('email')
        .notEmpty().withMessage('Must provide an Email')
        .isEmail().withMessage('Email is not valid'),
    body('password')
        .notEmpty().withMessage('Must provide a Password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Passowrd must be at least 8 characters')
        .matches('[0-9]').withMessage('Password must contain a number')
        .matches('[A-Z]').withMessage('Password must contain an uppercase letter'),

    (req, res, next) => {
        const result = validationResult(req)

        if (!result.isEmpty()) throw new AppError(result.array()[0].msg, 401)

        next()
    }
]

const validateName = [
    body('name')
        .notEmpty().withMessage('Must provide a Name')
        .isString().withMessage('Name must be a string')
        .escape().withMessage('Program injections are forbidden'),

    (req, res, next) => {
        const result = validationResult(req)

        if (!result.isEmpty()) throw new AppError(result.array()[0].msg, 401)

        next()
    }
]

module.exports = {
    validateLogin,
    validateSignup,
    validateName
}