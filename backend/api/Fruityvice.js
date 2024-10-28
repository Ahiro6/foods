const axios = require('axios');

const options = (name) => {
    const opt = {
        method: 'GET',
        url: `https://www.fruityvice.com/api/fruit/${name}`

    }

    return opt
};

const getFruits = async (name) => {
    try {
        const res = await axios.request(options(name));

        return res.data
    } catch (error) {
        console.error(error);
    }
}

module.exports = getFruits
