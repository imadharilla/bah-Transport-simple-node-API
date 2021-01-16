const db = require('../../database')

exports.createUser = async ({ body }) => db.model('User').create({ ...body })

exports.getUsers = async () => db.model('User').find()

exports.getSingleUser = async ({ userId }) => db.model('User').findById(userId)

exports.updateUser = ({ userId, body }) => db.model('User').findByIdAndUpdate(userId, { ...body }, { new: true })
