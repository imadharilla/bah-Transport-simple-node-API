// load environement variables
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const compression = require('compression')
const util = require('util')
const db = require('./database')
const config = require('./configuration')
const routing = require('./routing')
const helmet = require('helmet')

const initializeCors = () =>
  cors({
    origin: '*',
    methods: 'POST,GET,DELETE,PUT,PATCH,OPTIONS',
    allowedHeaders:
      'Host,Origin,Pragma,Referer,User-Agent,Accept,Accept-Encoding,Accept-Language,Cache-Control,Connection,Content-Length,Content-Type,Authorization,X-Requested-With,Access-Control-Request-Headers,Access-Control-Request-Method,Sec-Fetch-Dest,Sec-Fetch-Mode,Sec-Fetch-Site',
    credentials: true,
    maxAge: 1728000,
    optionsSuccessStatus: 200
  })

app.use(initializeCors)

app.use(helmet())
app.use(responseTime())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routing)

exports.start = async () => {
  try {
    const port = config.get('PORT') || 3000

    await db.connect()
    console.log(' Connected to database')

    util.promisify(app.listen).bind(app)(port)
    console.log(' App running at  %s ', port)
    console.log(' Press CTRL-C to stop\n')
  } catch (err) {
    console.info('Something went wrong')
    console.error(err)
  }
}
