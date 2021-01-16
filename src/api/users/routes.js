const router = require('express').Router({ mergeParams: true })
const { validateSchema } = require('../../middleware/validation')
const { createUser, getUsers, getSingleUser, updateUser } = require('./controller')
const { createUserSchema, updateUserSchema } = require('./validations')

router.post('/', validateSchema({ schema: createUserSchema }), async (req, res) =>
  res.json(await createUser({ body: req.body }))
)

router.get('/', async (req, res) => res.json(await getUsers()))

router.get('/:userId', async (req, res) => res.json(await getSingleUser({ userId: req.params.userId })))

router.patch('/:userId', validateSchema({ schema: updateUserSchema }), async (req, res) =>
  res.json(await updateUser({ userId: req.params.userId, body: req.body }))
)

module.exports = router
