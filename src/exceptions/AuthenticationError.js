import ClientError from './ClientError.js'

class AuthenticationError extends ClientError {
  constructor (message) {
    super(message, 403)
    this.name = 'AuthenticationError'
  }
}

export default AuthenticationError
