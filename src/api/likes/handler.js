import autoBind from 'auto-bind'

class LikesHandler {
  constructor (likesService, albumsService) {
    this._likesService = likesService

    this._albumsService = albumsService

    autoBind(this)
  }

  async postLikeHandler (request, h) {
    const { id: albumId } = request.params

    await this._albumsService.verifyAlbumExist(albumId)

    const { id: userId } = request.auth.credentials

    await this._likesService.addLike(userId, albumId)

    const response = h.response({
      status: 'success',
      message: 'Like added successfully.'
    })

    response.code(201)

    return response
  }

  async getLikesHandler (request, h) {
    const { id: albumId } = request.params

    await this._albumsService.verifyAlbumExist(albumId)

    const likes = await this._likesService.countLikes(albumId)

    return h.response({
      status: 'success',
      data: { likes }
    })
  }

  async deleteLikeHandler (request, h) {
    const { id: albumId } = request.params

    await this._albumsService.verifyAlbumExist(albumId)

    const { id: userId } = request.auth.credentials

    await this._likesService.deleteLike(userId, albumId)

    return h.response({
      status: 'success',
      message: 'Like removed successfully.'
    })
  }
}

export default LikesHandler
