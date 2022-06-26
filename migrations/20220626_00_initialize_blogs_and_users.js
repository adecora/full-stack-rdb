const { DataTypes, fn } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('NOW')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('NOW')
      },
      author: {
        type: DataTypes.STRING(1024)
      },
      url: {
        type: DataTypes.STRING(1024),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(1024),
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    }),
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('NOW')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn('NOW')
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
      password_hash: {
        type: DataTypes.STRING(1024),
        allowNull: false
      },
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  }
}