const axios = require('axios');

const options = (name) => {
    const opt = {
        method: 'GET',
        url: 'https://plants2.p.rapidapi.com/api/plants',
        params: {
            CN: name
        },
        headers: {
            Authorization: 'GKZOHNZj0xP65kk0BAE2Tl9LGagm0pfD3DFNxAEEZcMQBhRZVDco8vbNJdnwwCo0',
            'x-rapidapi-key': 'f0a385fef6msh13af9fbe04c1966p14a39fjsna254a00a0ead',
            'x-Rapidapi-host': 'plants2.p.rapidapi.com'
        }
    }

    return opt
};

const getPlants = async (name) => {
    try {
        const res = await axios.request(options(name));

        return res.data
    } catch (error) {
        console.error(error);
    }
}

module.exports = getPlants
