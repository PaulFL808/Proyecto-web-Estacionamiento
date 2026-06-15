"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("active_parkings", "check_out_at", {
      allowNull: true,
      type: Sequelize.DATE
    });

    await queryInterface.addColumn("active_parkings", "duration_minutes", {
      allowNull: true,
      type: Sequelize.INTEGER
    });

    await queryInterface.addColumn("active_parkings", "total_amount", {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2)
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("active_parkings", "total_amount");
    await queryInterface.removeColumn("active_parkings", "duration_minutes");
    await queryInterface.removeColumn("active_parkings", "check_out_at");
  }
};
