require('dotenv').config()

const { ENV, PORT } = process.env

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { logEntry } = require('./db')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/status', (req, res) => {
  res.send(200)
})

const logEvent = async (siteId, event, body = {}) => {
  const { aff, platform, exp, date } = body

  await logEntry(siteId, {
    event,
    aff,
    platform: platform.toLowerCase(),
    exp,
    date,
  })
}

app.post('/atc', async (req, res) => {
  const { siteId } = req.query

  try {
    await logEvent(siteId, 'atc', req.body)

    res.json({ success: true, event: 'atc' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ success: false })
  }
})

app.post('/purchase', async (req, res) => {
  const { siteId } = req.query
  try {
    await logEvent(siteId, 'purchase', req.body)

    res.json({ success: true, event: 'purchase' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ success: false })
  }
})

if (ENV === 'local') {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
  })
}

exports.app = app
