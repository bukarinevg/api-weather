const axios = require('axios');
const { prepareData } = require('./WeatherService');
// const {redisClient} = require('../dbConnections/redisConnection');

const API_URL = process.env.GEOCODING_API_URL;
const API_KEY = process.env.GEOCODING_API_KEY;

const GeoCodingService = {
    apiResponse: async function(location) {
        try {
            //connect to the API URL
            const response = await axios.get(API_URL, {
                params: {
                q: location,
                api_key: API_KEY
                }
            });
            //return the data
            const data = response.data; 
            return data[0];
     
        } catch (error) {
            //{status:500, message: 'Response Error: ' + error.message || 'Error: Something went wrong!'}
            throw {status:500, message: 'coordinates api error: ' + error.message};
            // console.error(error);
        }
    },

    getData: async function(location) {
        try { 
            //check if the location is in the cache
            // const cachedLocation = await redisClient.get(`geocoding:${location}`);
            // if(cachedLocation) {
            //     console.log('cached geocoding value');
            //     return JSON.parse(cachedLocation);
            // }

            let data = await this.apiResponse(location);

            if (!data || !data.lat || !data.lon) {
                throw  {status:404, message:'error coordinates empty data'};
            }
            
            data = this.prepareData(data);
            //store the data in the cache
            // await redisClient.set(`geocoding:${location}`, JSON.stringify(data), 'EX', 3600);

            return data;
        } catch (error) {
            //{status:error.status, message: 'Response Error: ' + error.message || 'Error: Something went wrong!' }
            throw  ({status: error.status || 500, message: ` ${error.message}  ${error.status}`} );
           
        }
    },

    prepareData: function(data) {
        return {
            lat:  data.lat,
            lon:  data.lon,
            display_name: data.display_name,
        };
    }
    
};


module.exports = GeoCodingService;