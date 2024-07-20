import pool from '../config/database.js'
import { nanoid } from 'nanoid'

class ActivitiesService {
  constructor () {
    this._pool = pool
  }

  async addActivity (playlistId, songId, userId, action) {
    const id = `history-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO playlist_songs_activities VALUES ($1, $2, $3, $4, $5)',
      values: [id, playlistId, songId, userId, action]
    }

    await this._pool.query(query)
  }
}

export default ActivitiesService
