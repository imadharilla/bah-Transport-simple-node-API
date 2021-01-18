const db = require('../../database')

exports.createVoyage = async ({ body }) => db.model('Voyage').create({ ...body })

exports.getVoyages = async () => db.model('Voyage').find()

exports.searchVoyages = async ({ depart, arrive, transport, time, minP, maxP }) => {
  const voyages = await db
    .model('Voyage')
    .find({ depart, arrive, transport, heureDepart: { $gte: time }, price: { $gte: minP, $lte: maxP } })
    .populate('depart')
    .populate('arrive')
  return voyages
}

exports.deleteVoyage = async ({ id }) => db.model('Voyage').findByIdAndDelete(id)
