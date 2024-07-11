import Joi from 'joi'

export const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required()
})

export const AlbumQuerySchema = Joi.object({
  title: Joi.string().empty(),
  performer: Joi.string().empty()
})
