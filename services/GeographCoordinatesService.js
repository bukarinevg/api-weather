var axios = require('axios');
//move it to env later
const API_URL = 'https://geocode.maps.co/search';
const API_KEY = '65fba62bbdc8c750070323mryefda71';

const GeographCoordinatesService = {
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
            throw   {status:500, message: 'api error' };
            // console.error(error);
        }
    },

    getCoordinates: async function(location) {
        try { 
            const data = await this.apiResponse(location);

            if (!data || !data.lat || !data.lon) {
                throw  {status:404, message:'error empty data'};
            }
            
            return {
                lat: data.lat,
                lon: data.lon
            };
        } catch (error) {
            //{status:error.status, message: 'Response Error: ' + error.message || 'Error: Something went wrong!' }
            throw  ({status: error.status || 500, message: ` ${error.message}  ${error.status}`} );
           
        }
    }
    
};


module.exports = GeographCoordinatesService;