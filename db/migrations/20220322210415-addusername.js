'use strict';

const { USER_INFO_TABLE } = require('./../models/userInfo.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_INFO_TABLE, 'username', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_INFO_TABLE, 'username');
  },
};
