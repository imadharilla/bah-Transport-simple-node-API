const mongoose = require('mongoose')
const find = require('find')
const path = require('path')
const config = require('../configuration')
const url = config.get('MONGO_DATABASE_URL')
const password = config.get('MONGO_DATABASE_PASSWORD')
const { getStringDate } = require('../utils/date')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  socketTimeoutMS: 45000,
  promiseLibrary: global.Promise,
  serverSelectionTimeoutMS: 5000,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  poolSize: 10,
  useFindAndModify: false
}

exports.connect = () => {
  const db = url.replace('<password>', password)
  return new Promise(async (resolve, reject) => {
    mongoose.connect(db, options)

    // await this.seed()

    const connection = mongoose.connection
    connection.on('error', reject)
    connection.once('open', resolve)
  })
}

exports.seed = async () => {
  await this.seedStations()
  await this.seedVoyages()
}

exports.seedStations = async () => {
  const villes = ['RABAT', 'FES', 'CASABLANCA', 'SEFROU', 'TANGER', 'SALE', 'KENITRA']
  await villes.forEach(async ville => {
    await this.model('Station').findOneAndUpdate({ nom: ville }, { nom: ville }, { upsert: true }).exec()
  })
}

exports.seedVoyages = async () => {
  const stations = await this.model('Station').find()
  const transports = ['train', 'bus', 'taxi']

  for (let i = 0; i < stations.length; i++) {
    stations.map(station => {
      if (station._id == stations[i]._id) return

      this.model('Voyage')
        .findOneAndUpdate(
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '15:00',
            heureArrive: '12:23',
            transport: transports[1]
          },
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '16:00',
            heureArrive: '18:30',
            transport: transports[1],
            price: 26
          },
          { upsert: true }
        )
        .exec()

      this.model('Voyage')
        .findOneAndUpdate(
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '16:00',
            heureArrive: '19:00',
            transport: transports[2]
          },
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '13:00',
            heureArrive: '15:00',
            transport: transports[2],
            price: 49
          },
          { upsert: true }
        )
        .exec()
    })
  }

  for (let i = 0; i < stations.length; i++) {
    stations.map(station => {
      if (station._id == stations[i]._id) return

      this.model('Voyage')
        .findOneAndUpdate(
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '16:00',
            heureArrive: '18:30',
            transport: transports[0]
          },
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '16:00',
            heureArrive: '18:30',
            transport: transports[0],
            price: 80
          },
          { upsert: true }
        )
        .exec()

      this.model('Voyage')
        .findOneAndUpdate(
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '13:00',
            heureArrive: '15:00',
            transport: transports[0]
          },
          {
            depart: stations[i],
            arrive: station,
            heureDepart: '13:00',
            heureArrive: '15:00',
            transport: transports[0],
            price: 100
          },
          { upsert: true }
        )
        .exec()
    })
  }
}

exports.model = key => mongoose.model(key)

const modelPaths = find.fileSync(/model.js$/, path.resolve(__dirname, '..'))
// Import models so mongoose have access in run time
modelPaths.forEach(path => require(path))
