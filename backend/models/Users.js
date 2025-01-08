const mongoose = require('mongoose')
const FruitList = require('./FruitList')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')

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

userSchema.pre('save', async function(next) {
    try {
      const User = this.constructor;
      
      const usernameExists = await User.findOne({ username: this.username });
      if (usernameExists) {
        throw new AppError('Username already exists', 400);
      }
      
      const emailExists = await User.findOne({ email: this.email });
      if (emailExists) {
        throw new AppError('Email already exists', 400);
      }
      
      next();
    } catch (error) {
      next(error);
    }
  });

const User = new mongoose.model('User', userSchema)

module.exports = User