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
    platform: platform?.toLowerCase(),
    exp,
    date
  })
}

app.get('/pageView', async (req, res) => {
  const { id } = req.query

  try {
    await logEvent(id, 'pageView', req.query)

    res.json({ success: true, event: 'pageView' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ success: false })
  }
})

app.get('/atc', async (req, res) => {
  const { id } = req.query

  try {
    await logEvent(id, 'atc', req.query)

    res.json({ success: true, event: 'atc' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ success: false })
  }
})

app.get('/purchase', async (req, res) => {
  const { id } = req.query

  try {
    await logEvent(id, 'purchase', req.query)

    res.json({ success: true, event: 'purchase' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ success: false })
  }
})

app.listen(PORT, () => {
  if (ENV === 'local') {
    console.log(`Listening at http://localhost:${PORT}`)
  }
})

exports.app = app
