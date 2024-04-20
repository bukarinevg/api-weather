const axios = require('axios');
const {redisClient} = require('../dbConnections/redisConnection');

function valid (ip) {
    return ip.split('.').length === 4;
}

module.exports.getLocationFromIP = async (ip) => {
    try {
        const location = await redisClient.get(ip);
        if(location) return location;
        if(!valid(ip)) throw new Error('Invalid ip address');
        const response = await axios.get('http://ip-api.com/json/' + ip);
        const data = response.data;
        if(!data.city) throw new Error('City not found using this ip address');
        await redisClient.set(ip, data.city, 'EX', 3600);
        return data.city;
    } catch (error) {
        location = 'New York';
        return location;
    }
}