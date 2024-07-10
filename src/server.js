import { config } from 'dotenv'
import { server as HapiServer } from '@hapi/hapi'
import albums from './api/albums/index.js'
import AlbumsService from './services/AlbumsService.js'
import AlbumsValidator from './validator/albums/index.js'
import ClientError from './exceptions/ClientError.js'

config()

const init = async () => {
  const albumsService = new AlbumsService()

  const server = new HapiServer({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
      validator: AlbumsValidator
    }
  })

  server.ext('onPreResponse', (request, h) => {
    const { response } = request

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      })

      newResponse.code(response.statusCode)

      return newResponse
    }

    return h.continue
  })

  await server.start()
  console.log(`[INFO] Server running on ${server.info.uri}.`)
}

init()
