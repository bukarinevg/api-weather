const axios = require('axios');

const API_URL = process.env.TIMEZONE_API_URL;

const TimeService = {
    apiResponse: async function(lat, lon) {
        try {
            //connect to the API URL
            const response = await axios.get(API_URL, {
                params: {
                    latitude: lat,
                    longitude: lon,
                }
            });
            //return the data
            const data = response.data;

            return data;

        } catch (error) {
            //{status:500, message: 'Response Error: ' + error.message || 'Error: Something went wrong!'}
            throw { status: 500, message: 'timezone api error' };
            // console.error(error);
        }
    },

    getData: async function(lat, lon) {
        try {
            let data = await this.apiResponse(lat, lon);

            if (!data || !data.dateTime) {
                throw { status: 404, message: 'error timezone empty data' };
            }
            
            data = this.prepareData(data);

            return data;
        } catch (error) {
            //{status:error.status, message: 'Response Error: ' + error.message || 'Error: Something went wrong!' }
            throw ({ status: error.status || 500, message: ` ${error.message}  ${error.status}` });

        }
    },

    prepareData: function(data) {
        if (data.minute < 10) {
            data.minute = '0' + data.minute;
        }
        if (data.hour < 10) {
            data.hour = '0' + data.hour;
        }
        return  {
            time: `${data.hour}:${data.minute}`,
            day: data.day,
            month: data.month,
            year: data.year,
            day_of_week: data.dayOfWeek,
            timeZone: data.timeZone
        };
    }
    
};

module.exports = TimeService;

