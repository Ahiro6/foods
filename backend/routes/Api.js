const express = require("express")

const router = express.Router()

const apiCon = require('../controllers/Api')

const { asyncError } = require('../utils/asyncError')

router.route('/plants/:name')
    .get(asyncError(apiCon.getPlants))

module.exports = router