
const {config} = require('dotenv'); //Función config del modulo dotenv 

config();

module.exports = {
    
    db:{
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        host: process.env.DB_HOST,
        database: process.env.DB_NAME
    }

};