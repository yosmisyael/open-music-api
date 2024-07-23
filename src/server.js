import { config } from 'dotenv'
import { server as HapiServer } from '@hapi/hapi'
import Jwt from '@hapi/jwt'
import ClientError from './exceptions/ClientError.js'
import albums from './api/albums/index.js'
import AlbumsService from './services/AlbumsService.js'
import AlbumsValidator from './validator/albums/index.js'
import songs from './api/songs/index.js'
import SongsService from './services/SongsService.js'
import SongValidator from './validator/songs/index.js'
import users from './api/users/index.js'
import UsersService from './services/UsersService.js'
import UsersValidator from './validator/users/index.js'
import authentications from './api/authentications/index.js'
import AuthenticationsService from './services/AuthenticationsService.js'
import TokenManager from './tokenize/TokenManager.js'
import AuthenticationsValidator from './validator/authentications/index.js'
import playlists from './api/playlists/index.js'
import PlaylistsService from './services/PlaylistsService.js'
import PlaylistsValidator from './validator/playlists/index.js'
import playlistsongs from './api/playlistsongs/index.js'
import PlaylistSongsService from './services/PlaylistSongsService.js'
import PlaylistSongsValidator from './validator/playlistsongs/index.js'
import collaborations from './api/collaborations/index.js'
import CollaborationsService from './services/CollaborationsService.js'
import CollaborationsValidator from './validator/collaborations/index.js'
import activities from './api/activities/index.js'
import ActivitiesService from './services/ActivitiesService.js'
import exports from './api/exports/index.js'
import ProducerService from './services/ProducerService.js'
import ExportsValidator from './validator/exports/index.js'
config()

const init = async () => {
  const albumsService = new AlbumsService()

  const songsService = new SongsService()

  const usersService = new UsersService()

  const authenticationsService = new AuthenticationsService()

  const collaborationsService = new CollaborationsService(usersService)

  const playlistsService = new PlaylistsService(collaborationsService)

  const playlistSongsService = new PlaylistSongsService(songsService)

  const activitiesService = new ActivitiesService()

  const producerService = new ProducerService()

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
    plugin: Jwt
  })

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,

    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },

    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator
      }
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongValidator
      }
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator
      }
    },
    {
      plugin: authentications,
      options: {
        service: authenticationsService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator
      }
    },
    {
      plugin: playlists,
      options: {
        service: playlistsService,
        validator: PlaylistsValidator
      }
    },
    {
      plugin: playlistsongs,
      options: {
        playlistsService,
        playlistSongsService,
        activitiesService,
        validator: PlaylistSongsValidator
      }
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator
      }
    },
    {
      plugin: activities,
      options: {
        activitiesService,
        playlistsService
      }
    },
    {
      plugin: exports,
      options: {
        producerService,
        playlistsService,
        validator: ExportsValidator
      }
    }
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })

        newResponse.code(response.statusCode)

        return newResponse
      }

      if (!response.isServer) {
        return h.continue
      }

      const newResponse = h.response({
        status: 'fail',
        message: 'The server has encountered a situation it does not know how to handle.'
      })

      newResponse.code(500)

      return newResponse
    }

    return h.continue
  })

  await server.start()
  console.log(`[INFO] Server running on ${server.info.uri}.`)
}

init()
