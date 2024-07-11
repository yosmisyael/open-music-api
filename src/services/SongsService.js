import pool from '../config/database.js'
import InvariantError from '../exceptions/InvariantError.js'
import { nanoid } from 'nanoid'

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
}

export default SongsService
