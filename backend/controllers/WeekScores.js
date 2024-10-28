const FruitList = require('../models/FruitList')
const WeekScore = require("../models/WeekScores")
const User = require("../models/Users")

const nodemailer = require('nodemailer')
const axios = require('axios')
const cron = require("node-schedule")
const AppError = require('../utils/AppError')
const { asyncError } = require('../utils/asyncError')

const htmlTemplate = (username, weekScore, fruits) => {
    let list = ''

    fruits.forEach((f) => {
        list += `<li> ${f.commonName}</li>`
    })

    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Awesome Email</title>
            </head>
            <body style='text-align: center; width: 50%; margin: auto;'>
                <h1>Hello ${username}!</h1>
                <h2><mark style='padding: 0.4em; 
                    background-color: lightgreen;'>
                        This week's score: ${weekScore.score}
                </mark></h2>
                <h2>Your goal: ${weekScore.goal}</h2>

                <hr/>
                <div style='padding: 1em;'>
                    <h3 style='text-align: left;'>
                        Fruit & Veg from the past week:
                    </h3>
                    <ol style='text-align: left;'>
                        ${list}
                    </ol>
                </div>
            </body>
        </html>`
}

const sendEmail = async (user, weekScore, fruitList) => {

    const transporter = nodemailer.createTransport({
        port: 465,
        host: process.env.HOST_EMAIL,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.EMAIL_PASSWORD    
        },
        secure: true
    })

    const mailData = {
        from: process.env.APP_EMAIL,
        to: user.email,
        subject: `Foods: Last week's fruit&veg score`,
        text: 'Foods',
        html: htmlTemplate(user.username, weekScore, fruitList.fruits)
    }

    let res = mailData

    transporter.sendMail(mailData, (err, info) => {

    })

    return res
}

const scheduleJob = asyncError(async (date, days, token) => {
    const end = new Date(date)
    end.setMinutes(end.getMinutes() + days)
    //end.setDate(end.getDate() + days)

    const headers = {
        'authorization': `Bearer ${token}`
    }

    cron.scheduleJob(end, async () => {
        await axios.delete(`${process.env.DEVELOPEMENT_URL}/weekscore/`, {headers})
    });
})

const checkDuplicateFruits = (fruit, fruits) => {
    let isDuplicate = false

    fruits.forEach((f) => {
        if(f.commonName === fruit) isDuplicate = true
    })

    return isDuplicate
}

module.exports.UpdateWeekScore = async (req, res) => {
    const { name } = req.body
    const user = req.userId

    console.log("Update", name)

    const fruitList = await FruitList.findOne({ user })
    const weekScore = await WeekScore.findOne({ user }).sort({ _id: -1 })

    if(!weekScore.onGoing) throw new AppError("Week has finished", 401)
    if(checkDuplicateFruits(name, fruitList.fruits)) throw new AppError("Can't add the same fruit/veg twice", 401)

    weekScore.score += 1;
    fruitList.fruits.push({ commonName: name })

    await weekScore.save()
    await fruitList.save()

    res.status(200).json({weekScores: [weekScore], fruitList})
}

module.exports.EndWeekScore = async (req, res) => {
    const user = req.userId

    const weekScore = await WeekScore.findOne({ user }).sort({ _id: -1 })
    const userModel = await User.findById(user)
    const fruitList = await FruitList.findOne({ user })

    if(!weekScore.onGoing) throw new AppError('Week has already ended. Start a new week.', 401)

    weekScore.onGoing = false

    if (weekScore.score >= weekScore.goal) {
        userModel.streak += 1
    }
    else {
        userModel.streak = 0
    }

    await weekScore.save()
    await userModel.save()

    const result = await sendEmail(userModel, weekScore, fruitList)

    res.status(205).json(weekScore)
}

module.exports.StartWeekScore = async (req, res) => {
    const user = req.userId

    const lastWeekScore = await WeekScore.findOne({ user }).sort({ _id: -1 })

    if(lastWeekScore && lastWeekScore.onGoing) throw new AppError("Already busy with a week", 401)

    const weekScore = new WeekScore({ user })
    const fruitList = await FruitList.findOne({ user })

    fruitList.fruits = []

    await fruitList.save()
    await weekScore.save()

    console.log("WeekScore", weekScore)

    scheduleJob(weekScore.weekStart, 7, req.token)

    res.status(201).json({ weekScores: [weekScore], fruitList })
}

module.exports.getWeekScore = async (req, res) => {
    const user = req.userId

    const weekScore = await WeekScore.findOne({ user }).sort({ _id: -1 })
    const fruitList = await FruitList.findOne({ user })

    const currDate = new Date()
    const startDate = new Date(weekScore.weekStart)

    const headers = {
        'authorization': `Bearer ${req.token}`
    }

    const days = startDate.getDate() + 7 - currDate.getDate() 
    console.log(days)
    if(days <= 0) {
        console.log("Running")
        await axios.delete(`${process.env.DEVELOPEMENT_URL}/weekscore/`, {headers})
    }

    res.status(200).json({weekScores: [weekScore], fruitList})
}

module.exports.getWeekScores = async (req, res) => {
    const user = req.userId

    const weekScores = await WeekScore.find({ user }).sort({_id: -1})

    res.status(200).json({weekScores, fruitList: []})
}

module.exports.testCron = async (req, res) => {
    const SECONDS_TO_WAIT = 300;

    const date = new Date();
    date.setSeconds(date.getSeconds() + SECONDS_TO_WAIT)

    cron.scheduleJob(date, () => {
        console.log("job", date.toString())
    });

    console.log("started")
    res.status(200).json("started")
}

