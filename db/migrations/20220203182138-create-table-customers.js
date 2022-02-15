'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model')
const { USER_TABLE } = require('./../models/user.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      firstName: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'first_name'
      },
      lastName: {
          allowNull: false,
          type: DataTypes.STRING,
          field: 'last_name'
      },
      location: {
          allowNull: false,
          type: DataTypes.STRING
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'created_at',
          defaultValue: Sequelize.NOW
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'created_at',
          defaultValue: Sequelize.NOW
      },
      userId: {
          field: 'user_id',
          allowNull: false,
          unique: true,
          type: DataTypes.INTEGER,
          references: {
              model: USER_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
      }
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
