const db = require('../../database')

exports.createStation = async ({ body }) => db.model('Station').create({ ...body })

exports.getStations = async () => db.model('Station').find()

exports.deleteStation = async ({ id }) => db.model('Station').findByIdAndDelete(id)
