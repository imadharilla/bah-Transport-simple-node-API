const router = require('express').Router({ mergeParams: true })
const users = require('./users/routes')
const stations = require('./stations/routes')
const voyages = require('./voyages/routes')

router.use('/users', users)
router.use('/stations', stations)
router.use('/voyages', voyages)

module.exports = router
