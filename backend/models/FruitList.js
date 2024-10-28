const mongoose = require("mongoose")

const fruitSchema = new mongoose.Schema({
    commonName: {
        type: String,
        unique: true
    },

})

const fruitListSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    fruits: [{
        type: fruitSchema,
        unique: true
    }]
})

const FruitList = new mongoose.model("FruitList", fruitListSchema)

module.exports = FruitList