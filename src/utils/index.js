function mapDBToModel ({
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

export { mapDBToModel, mapDBToSongsModel }
