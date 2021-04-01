require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const admin = require('firebase-admin')
const WooComOrders = require('./woocom')

const { ENV, FIREBASE_PROJECT_ID, FIREBASE_DB_URL } = process.env

if (ENV === 'prod')
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
else
  admin.initializeApp({
    projectId: FIREBASE_PROJECT_ID,
    databaseURL: FIREBASE_DB_URL,
  })

const db = admin.firestore()

const app = express()
const port = 3000

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(200)
})

const logEvent = async (event, cookies, body = {}) => {
  // Cookies will be timestamped, compare the timestamp on the cookie and
  // when this request came in to determine the latency of this event

  const { timezone } = body

  console.log(body)

  const { sarge_aff, sarge_ref } = cookies

  // TODO: Store in: process.env.CLIENT/sales/saletimestamp
}

app.get('/woo', async (req, res) => {
  const results = await WooComOrders()
  res.json(results)
})

app.post('/atc', async (req, res) => {
  console.log(req.body)
  await logEvent('atc', req.cookies, req.body)

  res.send('There was a sale!')
})

app.post('/purchase', async (req, res) => {
  await logEvent('purchase', req.cookies, req.body)

  res.send('There was a sale!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
