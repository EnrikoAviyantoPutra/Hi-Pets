const { Adoption, User } = require('../models');
const { deleteFileFromGCS } = require('../middlewares/gcs');

class AdoptionController {
  static async createAdoption(req, res, next) {
    try {
      const { name, species, gender, dob, description, image_url, latitude, longitude } = req.body;
      console.log(req.body, '<< body');
      
      const newAdoption = await Adoption.create({
        name,
        species,
        gender,
        dob: new Date(dob),
        description,
        image_url,
        latitude,
        longitude,
        user_id: +req.decoded.id
      })

      res.status(201).json(newAdoption)
    } catch(err) {
      next(err)
    }
  }

  static async getAllAdoption(req, res, next) {
    try {
      const adoptionList = await Adoption.findAll({
        include: User
      })
      res.status(200).json(adoptionList)
    } catch(err) {
      next(err)
    }
  }

  static async getAdoptionById(req, res, next) {
    try {
      const id = +req.params.id
      const adoption = await Adoption.findOne({
        where: { id },
        include: User
      })
      
      if (!adoption) throw { name: 'NotFound', status: 404, msg: 'Pet for adoption not found' }
      res.status(200).json(adoption)
    } catch(err) {
      next(err)
    }
  }

  static async updateAdoption(req, res, next) {
    try {
      const { name, species, gender, dob, description, image_url, latitude, longitude } = req.body;
      const id = +req.params.id

      const adoption = await Adoption.findByPk(id)
      if (!adoption) throw { name: 'NotFound', status: 404, msg: 'Pet for adoption not found' }

      if (image_url !== adoption.image_url) {
        deleteFileFromGCS(adoption.image_url)
      }

      const updatedAdoption = await Adoption.update({
        name,
        species,
        gender,
        dob,
        description,
        image_url,
        latitude,
        longitude
      }, {
        where: { id },
        returning: true
      })

      return res.status(200).json({ adoption: updatedAdoption[1][0], message: 'Successfully update pet data for adoption' });
    } catch(err) {
      next(err)
    }
  }

  static async deleteAdoption(req, res, next) {
    try {
      const id = +req.params.id
      
      const adoption = await Adoption.findByPk(id)
      
      if (!adoption) throw { name: 'NotFound', status: 404, msg: 'Pet for adoption not found' }
      
      let url = adoption.image_url
      let deletedAdoption = adoption

      const response = await Adoption.destroy({
        where: { id }
      })

      await deleteFileFromGCS(url)

      return res.status(200).json({ adoption: deletedAdoption, message: 'Successfully delete pet data for adoption' });
    } catch(err) {
      next(err)
    }
  }

  static async getAdoptionsBySpecies(req, res, next) {
    try {
      const species = req.params.species

      const adoptionListBySpecies = await Adoption.findAll({
        where: { species }
      })

      if(adoptionListBySpecies.length === 0){
        throw {
          status: 404,
          name: 'NotFound',
          msg: 'Not Found'
        }
      }
      
      return res.status(200).json(adoptionListBySpecies)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = AdoptionController;