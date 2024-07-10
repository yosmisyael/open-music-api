import Joi from 'joi'

const AlbumPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required()
})

export default AlbumPayloadSchema
