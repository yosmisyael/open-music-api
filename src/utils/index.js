function mapDBToAlbumsModel ({
  id,
  name,
  year,
  songs
}) {
  return {
    album: {
      id,
      name,
      year,
      songs
    }
  }
}

function mapDBToSongsModel ({
  id,
  title,
  performer
}) {
  return {
    id,
    title,
    performer
  }
}

function mapDBToSongModel ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId
}) {
  return {
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId
  }
}

export { mapDBToAlbumsModel, mapDBToSongsModel, mapDBToSongModel }
