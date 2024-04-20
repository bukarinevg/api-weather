const mongoose = require('mongoose');
const { uri, port } = require('../config/mongoConfig'); 
const app = require('../app');

const connectMongoDB = async() => {
  mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
      console.error("Error connecting to MongoDB", err);
    });
};

module.exports = connectMongoDB;
