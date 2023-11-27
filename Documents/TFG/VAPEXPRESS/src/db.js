const {Pool} = require('pg');

const {db} = require('./config'); //Cojemos el método db de archivo config

const pool = new Pool({
    user: db.user,
    host: db.host,
    password: db.password,
    database: db.database
});

module.exports= pool;

