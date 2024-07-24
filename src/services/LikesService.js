import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'

class LikesService {
  constructor () {
    this._pool = pool
  }

  async verifyLike (userId, albumId) {
    const query = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId]
    }

    const { rowCount } = await this._pool.query(query)

    if (rowCount) {
      throw new InvariantError('You have liked this album before.')
    }
  }

  async addLike (userId, albumId) {
    const id = `like-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO user_album_likes VALUES ($1, $2, $3)',
      values: [id, userId, albumId]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new InvariantError('Failed to add like to album.')
    }
  }

  async countLikes (albumId) {
    const query = {
      text: 'SELECT COUNT(user_id) FROM user_album_likes WHERE album_id = $1',
      values: [albumId]
    }

    const { rowCount } = await this._pool.query(query)

    return rowCount
  }

  async deleteLike (userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new InvariantError('Failed to delete like.')
    }
  }
}

export default LikesService
