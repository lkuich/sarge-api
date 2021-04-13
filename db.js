const { Pool } = require('pg')

const { DB_DATABASE, DB_HOST, DB_USER, DB_PASS, DB_PORT } = process.env

const pool = new Pool({
  max: 10,
  database: DB_DATABASE,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: DB_PORT,
})

pool.on('error', async (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  await pool.end()
})

const logEntry = (site, { event, aff, platform, exp, date }) => {
  const q = `
    INSERT INTO logging (site_id, event, aff, platform, exp, date)
    VALUES(${site}, '${event}', ${aff}, '${platform}', '${exp}', '${date}');`

  console.log(q)
  return pool.query(q)
}

exports.logEntry = logEntry
