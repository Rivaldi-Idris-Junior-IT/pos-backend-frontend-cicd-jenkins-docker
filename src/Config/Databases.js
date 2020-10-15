const Pool = require('pg-pool')
require("dotenv").config();

const mydb = new Pool({
    user : process.env.PGUSER,
    database : process.env.PGDATABASE,
    password : process.env.PASSWORD,
    host : process.env.PGHOST
})

module.exports = mydb
