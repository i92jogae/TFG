const mysql = require('mysql2/promise')
const { env } = require('./env')

const pool = mysql.createPool({
  host: env.database.host,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name,
  port: env.database.port,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: false
})

async function closeDatabase() {
  await pool.end()
}

module.exports = {
  pool,
  closeDatabase
}
