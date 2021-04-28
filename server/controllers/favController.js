const { Favorite, Adoption } = require('../models')

class FavoriteController {
  static async getAllFav(req, res, next) {
    try {
      const favoriteList = await Favorite.findAll({
        include: Adoption,
        where: { user_id: +req.decoded.id }
      })

      res.status(200).json(favoriteList)
    } catch (err) {
      next(err)
    }
  }

  static async createFav(req, res, next) {
    try {
      const { adoption_id } = req.body
      const user_id = +req.decoded.id
      const newFavorite = await Favorite.create({
        adoption_id,
        user_id
      })
      res.status(201).json(newFavorite)
    } catch (err) {
      next(err)
    }
  }

  static async removeFav(req, res, next) {
    try {
      const id = +req.params.id
      const favorite = await Favorite.findByPk(id)
      if (!favorite) throw { name: 'NotFound', status: 404, msg: 'Favorite not found' }
      let deletedFav = favorite

      const response = await Favorite.destroy({
        where: { id }
      })

      res.status(200).json({ favorite: deletedFav, message: 'Successfully delete pet from favorite' });
    } catch (err) {
      next(err)
    }
  }
}

module.exports = FavoriteController