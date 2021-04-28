const { Adoption } = require('../models');

const authorizationAdopter = (req, res, next) => {
  const id = +req.params.id;

  Adoption.findOne({
    where: { id: id }
  })
    .then(adopt => {
      if (!adopt) throw { name: "NotFound", status: 404, msg: 'Pet for adoption not found!' };

      if (adopt.user_id === +req.decoded.id) {
        next();
      } else {
        throw { name: "Unauthorized", status: 401, msg: 'You are not authorized to perform this action' };
      }
    })
    .catch(err => {
      next(err);
    })
}

module.exports = authorizationAdopter;