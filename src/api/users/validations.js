const Joi = require('joi')

const AddressSchema = Joi.object({
  address1: Joi.string().max(40),
  address2: Joi.string().max(40),
  zip_code: Joi.string().max(30),
  state: Joi.string().max(30),
  city: Joi.string().max(30),
  country: Joi.string().max(30)
})

const userSchema = {
  name: Joi.string().min(3).max(30).required(),
  dob: Joi.date(),
  address: AddressSchema,
  description: Joi.string()
}

exports.createUserSchema = Joi.object(userSchema)

exports.updateUserSchema = Joi.object({
  ...userSchema,
  name: Joi.string().min(3).max(30)
})
