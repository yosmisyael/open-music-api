import Joi from 'joi'

export const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().optional(),
  albumId: Joi.string().optional()
})

export const SongQuerySchema = Joi.object({
  title: Joi.string().empty(''),
  performer: Joi.string().empty('')
})
