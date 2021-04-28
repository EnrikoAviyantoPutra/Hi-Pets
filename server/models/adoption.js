'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Adoption.belongsTo(models.User, {foreignKey: 'user_id'})
      Adoption.hasMany(models.Favorite, {foreignKey: 'adoption_id'})
    }
  };
  Adoption.init({
    user_id: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter pet name'
        }
      }
    },
    species: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter pet species'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter pet gender'
        }
      }
    },
    dob: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter date of birth'
        }
      }
    },
    description: {
      type: DataTypes.STRING(1000),
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter description'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please upload pet image'
        }
      }
    },
    latitude: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter latitude'
        }
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter longitude'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Adoption',
  });
  return Adoption;
};