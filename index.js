require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const admin = require('firebase-admin')
const WooComOrders = require('./woocom')

const serviceAccount = require('./sarge-firestore-config.json')

const { ENV, FIREBASE_PROJECT_ID, FIREBASE_DB_URL } = process.env

if (ENV === 'prod')
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
else {
  console.log('Init in dev mode')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DB_URL,
  })
}

const db = admin.firestore()

const app = express()
const port = 3000

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(200)
})

const logEvent = async (id, event, body = {}) => {
  // Cookies will be timestamped, compare the timestamp on the cookie and
  // when this request came in to determine the latency of this event

  const { aff, ref, exp, date } = body

  return db.collection('sites').doc(id).collection('visits').doc().set({
    event,
    aff,
    ref,
    exp,
    date,
    serverTime: new Date(),
  })
}

app.get('/woo', async (req, res) => {
  const results = await WooComOrders()
  res.json(results)
})

app.post('/atc', async (req, res) => {
  const { id } = req.query
  await logEvent(id, 'atc', req.body)

  res.send('There was an ATC!')
})

app.post('/purchase', async (req, res) => {
  const { id } = req.query
  await logEvent(id, 'purchase', req.body)

  res.send('There was a sale!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
