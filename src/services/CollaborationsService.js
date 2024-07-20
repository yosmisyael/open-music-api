import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'

class CollaborationsService {
  constructor (usersServiece) {
    this._pool = pool

    this._usersService = usersServiece
  }

  async addCollaboration (playlistId, userId) {
    const id = `collab-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Failed to add collaborator.')
    }

    return result.rows[0].id
  }

  async deleteCollaboration (playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Failed to remove collaborator.')
    }
  }

  async verifyCollaborator (playlistId, userId) {
    const query = {
      text: 'SELECT user_id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Invalid collaborator verification.')
    }
  }

  async verifyCollaboratorExist (userId) {
    await this._usersService.getUserById(userId)
  }
}

export default CollaborationsService
