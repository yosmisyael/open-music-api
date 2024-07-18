import { PostAuthenticationPayloadSchema } from '../authentications/schema.js'
import InvariantError from '../../exceptions/InvariantError.js'
import { PlaylistSongPayloadSchema } from './schema.js'

const PlaylistsValidator = {
  validatePostPlaylistsPayload: (payload) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validatePostSongPlaylistsPayload: (payload) => {
    const validationResult = PlaylistSongPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default PlaylistsValidator
