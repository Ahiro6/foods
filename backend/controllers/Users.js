const User = require("../models/Users")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")

const generateToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_KEY, {
        expiresIn: '24h'
    })
}

module.exports.Login = async (req, res) => {
    const { username, password } = req.body

    let user = await User.findOne({ username })
    if (!user) throw new AppError("Username or Password does not match", 401)

    user = await user.compareHash(password)
    if (!user) throw new AppError("Username or Password does not match", 401)

    user = user.blankPW()

    const token = generateToken(user._id)

    console.log(user, token)
    
    res.status(200).json({ user, token })
}

module.exports.Signup = async (req, res) => {
    const { username, firstname, surname, password, email } = req.body

    let user = new User({ username, firstname, surname, password, email })

    user.password = await user.hash()
    await user.save()
    user = user.blankPW()

    const token = generateToken(user._id)

    res.status(201).json({ user, token })
}

module.exports.Logout = async (req, res) => {
    const user = req.userId

    res.status(200).json(`Logouted user: ${user}`)
}

module.exports.GetUser = async (req, res) => {
    const userId = req.userId
    const token = req.token

    const user = await User.findById(userId)

    console.log(user)

    res.status(201).json({ user, token })
}

