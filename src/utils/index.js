function mapDBToAlbumsModel ({
  id,
  name,
  year
}) {
  return {
    album: {
      id,
      name,
      year
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
