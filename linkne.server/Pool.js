const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const devConfig = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:'linkne',
}

const pool = new Pool(devConfig);

module.exports = pool;