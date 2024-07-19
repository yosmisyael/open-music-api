import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'
import NotFoundError from '../exceptions/NotFoundError.js'

class PlaylistSongsService {
  constructor () {
    this._pool = pool
  }

  async addSongToPlaylist (playlistId, songId) {
    const id = `songlist-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add song into playlist.')
    }
  }

  async verifySongExist (songId) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [songId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Song not found.')
    }
  }

  async getPlaylistSongs (playlistId) {
    const query = {
      text: `SELECT playlists.id,
                    playlists.name,
                    users.username,
                    COALESCE(
                                    JSON_AGG(
                                    JSON_BUILD_OBJECT(
                                            'id', songs.id,
                                            'title', songs.title,
                                            'performer', songs.performer
                                    )
                                            ) FILTER (WHERE songs.id IS NOT NULL),
                                    '[]'::json
                    ) AS songs
             FROM playlists
                      JOIN users ON playlists.owner = users.id
                      LEFT JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
                      LEFT JOIN songs ON playlist_songs.song_id = songs.id
             WHERE playlists.id = $1
             GROUP BY playlists.id, playlists.name, users.username`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    return result.rows[0]
  }
}

export default PlaylistSongsService
