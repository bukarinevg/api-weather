# Weather Forecast API

This project is a weather forecast API built with Express.js, following the MVC (Model-View-Controller) pattern. 
It provides the current weather and a 5-day forecast for any location, hourly and daily. 
The API uses JWT for authorization and MongoDB for user management.

## Features

- Get current weather for any location
- Get a 5-day weather forecast for any location
- User registration and login using JWT authorization
- User data is stored in MongoDB
- Utilized Redis for caching GeoCoding API responses and Location data

## APIs Used

- Geocoding API: Used to get the coordinates of a location
- Open-Meteo Forecast API: Used to get the current weather and 5-day forecast using coordinates

## Getting Started

### Installation

1. Clone the repository
git clone https://github.com/bukarinevg/app-weather.git
2. Install NPM packages
npm install
3. Start the server
npm start

### Usage

After starting the server, you can use the API endpoints to get the weather data. You will need to register a user and use the provided JWT token for authorization.

#### Register a User

## Routes

### Signup

- Method: POST
- Endpoint: /signup
- Description: This route is used for user registration. It allows users to create an account by providing their credentials.

### Login

- Method: POST
- Endpoint: /login
- Description: This route is used for user login. It allows users to log in to their account and get a JWT token for authorization.

### Index route for weather
 - Method: GET
 - Endpoint: `/{parameter of region}`
 - Description: This route is used for user to get the weather of a region. It allows users to get the weather of a region by providing the region name.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

Your Name - bukarinevgeni@gmail.com

Project Link: [https://github.com/bukarinevg/app-weather]

