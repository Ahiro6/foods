const express = require("express")
const router = express.Router()

const conWeekScore = require("../controllers/WeekScores")

const { authUser } = require('../middlewares/auth')
const { validateName } = require('../middlewares/validate')

const { asyncError } = require('../utils/asyncError')

router.route("/")
    .get(authUser, asyncError(conWeekScore.getWeekScore))
    .post(authUser, asyncError(conWeekScore.StartWeekScore))
    .delete(authUser, asyncError(conWeekScore.EndWeekScore))
    .put(authUser, validateName, asyncError(conWeekScore.UpdateWeekScore))

router.route("/all/")
    .get(authUser, asyncError(conWeekScore.getWeekScores))

router.route("/test/")
    .get(asyncError(conWeekScore.testCron))

module.exports = router