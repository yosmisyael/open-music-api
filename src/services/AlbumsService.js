import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'

class AlbumsService {
  constructor () {
    this._pool = pool
  }

  async addAlbum ({ name, year }) {
    const id = `album-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add new album.')
    }

    return result.rows[0].id
  }
}

export default AlbumsService
