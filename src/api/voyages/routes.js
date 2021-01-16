const router = require('express').Router({ mergeParams: true })
const { getVoyages, createVoyage, deleteVoyage, searchVoyages } = require('./controller')

router.get('/', async (req, res) => res.json(await getVoyages()))

router.get('/search', async (req, res) =>
  res.json(
    await searchVoyages({
      depart: req.query.depart,
      arrive: req.query.arrive,
      time: req.query.time,
      transport: req.query.transport
    })
  )
)

router.post('/', async (req, res) => res.json(await createVoyage({ body: req.body })))

router.delete('/:id', async (req, res) => res.json(await deleteVoyage({ id: req.params.id })))

module.exports = router
