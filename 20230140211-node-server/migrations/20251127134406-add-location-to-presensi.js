'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Tambah kolom latitude
    await queryInterface.addColumn('Presensis', 'latitude', {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true // lokasi boleh kosong jika user menolak izin
    });

    // Tambah kolom longitude
    await queryInterface.addColumn('Presensis', 'longitude', {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Hapus kolom jika rollback
    await queryInterface.removeColumn('Presensis', 'latitude');
    await queryInterface.removeColumn('Presensis', 'longitude');
  }
};
