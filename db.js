const { Pool } = require('pg')

const { DATABASE_URL } = process.env

const pool = new Pool({
  max: 10,
  connectionString: DATABASE_URL,
})

pool.on('error', async (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  await pool.end()
})

const logEntry = (site, { event, aff, platform = 'native', exp, date }) => {
  const q = `
    INSERT INTO logging (site_id, event, aff, platform, exp, date)
    VALUES(${site}, '${event}', ${aff}, '${platform}', '${new Date(exp).toDateString()}', '${new Date(date).toDateString()}');`

  return pool.query(q)
}

exports.logEntry = logEntry
