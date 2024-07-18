import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'

class PlaylistsService {
  constructor () {
    this._pool = pool
  }

  async addPlaylist ({ name, owner }) {
    const id = `playlist-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add new playlist.')
    }

    return result.rows[0].id
  }

  async getPlaylist (owner) {
    const query = {
      text: `SELECT users.username, playlists.id, playlists.name
                 FROM playlists
                          INNER JOIN users ON playlists.owner = users.id
                 WHERE playlists.owner = $1`,
      values: [owner]
    }

    const result = await this._pool.query(query)

    return result.rows
  }
}

export default PlaylistsService
