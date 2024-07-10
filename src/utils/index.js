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

export { mapDBToModel }
