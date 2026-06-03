"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("parking_spots", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20)
      },
      floor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      sector: {
        allowNull: false,
        type: Sequelize.STRING(60),
        defaultValue: "general"
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM("standard", "disabled", "electric", "motorcycle"),
        defaultValue: "standard"
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("available", "occupied", "maintenance", "reserved"),
        defaultValue: "available"
      },
      hourly_rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 1500
      },
      notes: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("parking_spots");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_parking_spots_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_parking_spots_status";');
  }
};
