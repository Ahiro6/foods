const getPlants = require("../api/PlantsRapidApi");
const getFruits = require("../api/Fruityvice");

module.exports.getPlants = async (req, res) => {
    const { name } = req.params

    const response = await getPlants(name)

    const plant = response.length ? response.slice(0, 1).map(i => i.CommonName) : ''

    res.status(200).json({ plant })
}


module.exports.getFruits = async (req, res) => {
    const { name } = req.body

    const response = await getFruits(name)

    res.status(200).json(response)
}