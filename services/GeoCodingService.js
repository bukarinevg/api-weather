const axios = require('axios');
const { prepareData } = require('./WeatherService');

const API_URL = process.env.GEOCODING_API_URL;
const API_KEY = process.env.GEOCODING_API_KEY;

const GeoCodingService = {
    apiResponse: async function(location) {
        try {
            //connect to the API URL
            const response = await axios.get(API_URL, {
                params: {
                q: location,
                key: API_KEY
                }
            });
            //return the data
            const data = response.data; 
            return data[0];
     
        } catch (error) {
            //{status:500, message: 'Response Error: ' + error.message || 'Error: Something went wrong!'}
            throw   {status:500, message: 'coordinates api error' };
            // console.error(error);
        }
    },

    getData: async function(location) {
        try { 
            let data = await this.apiResponse(location);

            if (!data || !data.lat || !data.lon) {
                throw  {status:404, message:'error coordinates empty data'};
            }
            
            data = this.prepareData(data);

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