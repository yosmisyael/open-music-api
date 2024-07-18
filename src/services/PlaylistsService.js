import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'
import NotFoundError from '../exceptions/NotFoundError.js'
import AuthorizationError from "../exceptions/AuthorizationError.js";

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

  async deletePlaylist (id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found.')
    }
  }

  async verifyPlaylistOwnership (id, owner) {
    const query = {
      text: 'SELECT id from playlists WHERE id = $1',
      values: [id]
    }

    const result = this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found.')
    }

    if (owner !== result.rows[0].owner) {
      throw new AuthorizationError('You do not have rights to access this resource.')
    }
  }
}

export default PlaylistsService