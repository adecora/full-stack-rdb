const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(1024),
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING(1024),
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

module.exports = User
