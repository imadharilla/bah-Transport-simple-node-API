const router = require('express').Router()
const api = require('../api/routes')

router.use('/v1', api)

module.exports = router
