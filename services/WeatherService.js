var axios = require('axios');

//move it to env later
const API_URL = process.env.WEATHER_API_URL;
// const API_KEY = '65fba62bbdc8c750070323mryefda71';

const weatherService = {
    apiResponse: async function(lat, lon) {
        try {
            //connect to the API URL
            const response = await axios.get(API_URL, {
                params: {
                    latitude: lat,
                    longitude: lon,
                    current_weather: true,
                    daily:'sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min'
                }
            });
            //return the data
            const data = response.data;

            return data;

        } catch (error) {
            //{status:500, message: 'Response Error: ' + error.message || 'Error: Something went wrong!'}
            throw { status: 500, message: 'weather api error' };
            // console.error(error);
        }
    },

    getWeather: async function(lat, lon) {
        try {
            const data = await this.apiResponse(lat, lon);

            if (!data || !data.current_weather_units || !data.current_weather) {
                throw { status: 404, message: 'error weather empty data' };
            }

            return data;
        } catch (error) {
            //{status:error.status, message: 'Response Error: ' + error.message || 'Error: Something went wrong!' }
            throw ({ status: error.status || 500, message: ` ${error.message}  ${error.status}` });

        }
    }

};

module.exports = weatherService;