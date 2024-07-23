import pool from '../config/database.js'
import { nanoid } from 'nanoid'
import InvariantError from '../exceptions/InvariantError.js'
import NotFoundError from '../exceptions/NotFoundError.js'

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

    const { rows, rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new InvariantError('Failed to add new album.')
    }

    return rows[0].id
  }

  async editAlbumCover (id, path) {
    const query = {
      text: 'UPDATE albums SET cover = $1 WHERE id = $2 RETURNING id',
      values: [path, id]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new InvariantError('Failed to update album cover.')
    }
  }

  async getAlbumById (id) {
    const query = {
      text: `
        SELECT albums.id,
               albums.name,
               albums.year,
               albums.cover as "coverUrl",
               CASE
                 WHEN EXISTS (SELECT 1 FROM songs WHERE songs."albumId" = albums.id) THEN
                   json_agg(json_build_object('id', songs.id, 'performer', songs.performer, 'title',
                                              songs.title))
                 ELSE
                   '[]'
                 END AS songs
        FROM albums
               LEFT JOIN songs ON albums.id = songs."albumId"
        WHERE albums.id = $1
        GROUP BY albums.id, albums.name, albums.year;
      `,
      values: [id]
    }

    const { rows, rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new NotFoundError('Album not found.')
    }

    return rows[0]
  }

  async editAlbumById (id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id]
    }

    const { rows } = await this._pool.query(query)

    if (!rows.length) {
      throw new NotFoundError('Album not found.')
    }
  }

  async deleteAlbumById (id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id]
    }

    const { rows } = await this._pool.query(query)

    if (!rows.length) {
      throw new NotFoundError('Album not found.')
    }
  }
}

export default AlbumsService
