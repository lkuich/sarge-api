const { Pool } = require('pg')

const {
  ENV,
  DB_DATABASE,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_SOCKET,
} = process.env

const PORT = DB_PORT || 5432

let pool
if (ENV === 'local') {
  pool = new Pool({
    max: 10,
    database: DB_DATABASE,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: PORT,
  })
} else {
  pool = new Pool({
    max: 10,
    database: DB_DATABASE,
    socketPath: DB_SOCKET,
    user: DB_USER,
    password: DB_PASS,
  })
}

pool.on('error', async (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  await pool.end()
})

const logEntry = (site, { event, aff, platform, exp, date }) => {
  const q = `
    INSERT INTO logging (site_id, event, aff, platform, exp, date)
    VALUES(${site}, '${event}', ${aff}, '${platform}', '${exp}', '${date}');`

  return pool.query(q)
}

exports.logEntry = logEntry
