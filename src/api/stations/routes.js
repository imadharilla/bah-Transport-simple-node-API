const router = require('express').Router({ mergeParams: true })
const { getStations, createStation, deleteStation } = require('./controller')

router.get('/', async (req, res) => res.json(await getStations()))

router.post('/', async (req, res) => res.json(await createStation({ body: req.body })))

router.delete('/:id', async (req, res) => res.json(await deleteStation({ id: req.params.id })))

module.exports = router
