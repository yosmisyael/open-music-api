import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'
import NotFoundError from '../exceptions/NotFoundError.js'

class PlaylistSongsService {
  constructor (songsService) {
    this._pool = pool

    this._songsService = songsService
  }

  async addSongToPlaylist (playlistId, songId) {
    const id = `songlist-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new InvariantError('Failed to add song into playlist.')
    }
  }

  async verifySongExist (songId) {
    await this._songsService.getSongById(songId)
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

    const { rows } = await this._pool.query(query)

    return rows[0]
  }

  async deletePlaylistSong (songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE song_id = $1 RETURNING id',
      values: [songId]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new NotFoundError('Song not found on playlist.')
    }
  }
}

export default PlaylistSongsService
