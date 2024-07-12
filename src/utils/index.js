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

export { mapDBToAlbumsModel }
