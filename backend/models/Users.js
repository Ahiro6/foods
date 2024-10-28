const mongoose = require('mongoose')
const FruitList = require('./FruitList')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    streak: {
        type: Number,
        default: 0,
    },
    dateJoined: {
        type: Date,
        default: () => Date(),
    },
})

userSchema.method('hash', async function hash() {
    const saltRounds = 10
    let password = this.password

    password = await bcrypt.hash(password, saltRounds);
    
    return password
})

userSchema.method('compareHash', async function compareHash(password) {
    const res = await bcrypt.compare(password, this.password)
    
    return res ? this : res
})

userSchema.method('blankPW', function blankPW() {
    this.password = ''

    return this
})

userSchema.post('save', async (doc, next) => {
    const fruitList = await new FruitList({
        user: doc._id,
        fruits: []
    })

    await fruitList.save()

    next()
})

const User = new mongoose.model('User', userSchema)

module.exports = User