import pool from '../config/database.js'
import InvariantError from '../exceptions/InvariantError.js'
import { nanoid } from 'nanoid'
import { mapDBToSongModel, mapDBToSongsModel } from '../utils/index.js'
import NotFoundError from '../exceptions/NotFoundError.js'

class SongsService {
  constructor () {
    this._pool = pool
  }

  async addSong ({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add new song.')
    }

    return result.rows[0].id
  }

  async getSongs () {
    const query = {
      text: 'SELECT * FROM songs'
    }

    await this._pool.query(query)

    const result = await this._pool.query(query)

    return result.rows.map(mapDBToSongsModel)
  }

  async getSongById (id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Song not found.')
    }

    return result.rows.map(mapDBToSongModel)[0]
  }
}

export default SongsService
