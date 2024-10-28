const mongoose = require("mongoose")

const weekScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        default: 0
    },
    goal: {
        type: Number,
        default: 30
    },
    user: {
        type: mongoose.ObjectId,
        ref: "User" 
    },
    weekStart: {
        type: Date,
        default: () => new Date()
    },
    onGoing: {
        type: Boolean,
        default: true
    }
})

const WeekScore = new mongoose.model("WeekScore", weekScoreSchema)

module.exports = WeekScore