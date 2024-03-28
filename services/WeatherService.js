const axios = require('axios');

const API_URL = process.env.WEATHER_API_URL;

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

    getData: async function(lat, lon) {
        try {
            let data = await this.apiResponse(lat, lon);

            if (!data || !data.current_weather_units || !data.current_weather) {
                throw { status: 404, message: 'error weather empty data' };
            }
            
            data = this.prepareData(data);

            return data;
        } catch (error) {
            //{status:error.status, message: 'Response Error: ' + error.message || 'Error: Something went wrong!' }
            throw ({ status: error.status || 500, message: ` ${error.message}  ${error.status}` });

        }
    },

    prepareData: function(data) {
        const current_weather = data.current_weather;
        const daily = data.daily;

        const current_sunrise = data.daily.sunrise[0];
        const current_sunset = data.daily.sunset[0];

        return {
            current_weather: {
                time: current_weather.time,
                temperature: current_weather.temperature,
                weather_code: current_weather.weathercode,
                sunrise: current_sunrise,
                sunset: current_sunset
            },
            daily: {
                sunrise: daily.sunrise,
                sunset: daily.sunset,
                temperature_max: daily.temperature_2m_max,
                temperature_min: daily.temperature_2m_min,
                weather_code: daily.weather_code
            }
        };
    }

};

module.exports = weatherService;