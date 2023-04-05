'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      token:{
        type: Sequelize.STRING

      },
      ip: {
        type: Sequelize.STRING

      },
      source_port: {
        type: Sequelize.STRING,

      },

      route: {
        type: Sequelize.STRING,
      },
      status:{
        type: Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },




    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('logs');

  }
};