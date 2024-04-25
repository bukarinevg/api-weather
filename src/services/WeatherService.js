const axios = require('axios');

const API_URL = process.env.WEATHER_API_URL;

const weatherService = {
    apiResponse: async function(lat, lon, timeZone) {
        try {
            //connect to the API URL
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.get(API_URL, {
                params: {
                    latitude: lat,
                    longitude: lon,
                    current_weather: true,
                    daily:'sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
                    hourly:'temperature_2m,weathercode,windspeed,winddirection,precipitation_probability',
                    timezone: timeZone,
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

    getData: async function(lat, lon, timeZone) {
        try {
            let data = await this.apiResponse(lat, lon, timeZone);

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
        const hourly = data.hourly;

        const current_sunrise = data.daily.sunrise[0];
        const current_sunset = data.daily.sunset[0];
        const current_precipitation = data.daily.precipitation_sum[0];

        hourly['date'] = hourly['time'].map(time => time.split('T')[0]);

        daily.hourly = [];
        let ind = 0; 
        while ( daily['hourly'].length < 7) {
            daily.hourly.push(
            {
                date: hourly['date'][ind],
                time: hourly['time'].slice(ind, ind + 24),
                temperature: hourly['temperature_2m'].slice(ind, ind + 24),
                weather_code: hourly['weathercode'].slice(ind, ind + 24),
                precipitation_probability: hourly['precipitation_probability'].slice(ind, ind + 24),
            });
            ind += 24;
        }
       
        

        return {
            current_weather: {
                time: current_weather.time,
                temperature: current_weather.temperature,
                weather_code: current_weather.weathercode,
                sunrise: current_sunrise,
                sunset: current_sunset,
                wind_speed: current_weather.windspeed,
                wind_direction: current_weather.winddirection,
                precipitation: current_precipitation,
            },
            daily: {
                sunrise: daily.sunrise,
                sunset: daily.sunset,
                temperature_max: daily.temperature_2m_max,
                temperature_min: daily.temperature_2m_min,
                weather_code: daily.weather_code,
                precipitation_sum: daily.precipitation_sum,
                hourly: daily.hourly,
            },
            
           
        };
    }

};

module.exports = weatherService;