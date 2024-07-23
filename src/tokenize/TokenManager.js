import Jwt from '@hapi/jwt'
import config from '../utils/config.js'
import InvariantError from '../exceptions/InvariantError.js'

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, config.auth.access),

  generateRefreshToken: (payload) => Jwt.token.generate(payload, config.auth.refresh),

  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken)

      Jwt.token.verifySignature(artifacts, config.auth.refresh)

      const { payload } = artifacts.decoded

      return payload
    } catch (error) {
      throw new InvariantError('Invalid refresh token.')
    }
  }
}

export default TokenManager
