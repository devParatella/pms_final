'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reservations', 'qtdGuest', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
    await queryInterface.addColumn('Reservations', 'qtdChild', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('Reservations', 'stand', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Standart'
    });
    await queryInterface.addColumn('Reservations', 'tipo', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Solteiro'
    });
    await queryInterface.addColumn('Reservations', 'guest', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Reservations', 'requesterName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Reservations', 'companyName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Reservations', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Reservations', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Reservations', 'emailVoucher', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Reservations', 'eventType', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Reservations', 'observations', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reservations', 'qtdGuest');
    await queryInterface.removeColumn('Reservations', 'qtdChild');
    await queryInterface.removeColumn('Reservations', 'stand');
    await queryInterface.removeColumn('Reservations', 'tipo');
    await queryInterface.removeColumn('Reservations', 'guest');
    await queryInterface.removeColumn('Reservations', 'requesterName');
    await queryInterface.removeColumn('Reservations', 'companyName');
    await queryInterface.removeColumn('Reservations', 'phone');
    await queryInterface.removeColumn('Reservations', 'email');
    await queryInterface.removeColumn('Reservations', 'emailVoucher');
    await queryInterface.removeColumn('Reservations', 'eventType');
    await queryInterface.removeColumn('Reservations', 'observations');
  }
};
