const axios = require('axios');
const {redisClient} = require('../dbConnections/redisConnection');

function valid (ip) {
    return ip.split('.').length === 4;
}

module.exports.getLocationFromIP = async (ip) => {
    try {
        if(!valid(ip)) throw new Error('Invalid ip address');
        const cacheKey = `ip:${ip}`;
        const cachedLocation = await redisClient.get(cacheKey);
        if(cachedLocation) {
            console.log('chached ip value')
            return cachedLocation;
        }
        const response = await axios.get('http://ip-api.com/json/' + ip);
        const {city} = response.data;
        if(!city) throw new Error('City not found using this ip address');
        await redisClient.set(cacheKey, city, 'EX', 3600);
        return data.city;
    } catch (error) {
        return 'New York';
    }
}