"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("active_parkings", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      parking_spot_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "parking_spots",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      plate: {
        allowNull: false,
        type: Sequelize.STRING(12)
      },
      driver_name: {
        allowNull: true,
        type: Sequelize.STRING(120)
      },
      vehicle_type: {
        allowNull: false,
        type: Sequelize.ENUM("car", "motorcycle", "truck"),
        defaultValue: "car"
      },
      check_in_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      expected_exit_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("active", "finished", "cancelled"),
        defaultValue: "active"
      },
      created_by: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("active_parkings");
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_active_parkings_vehicle_type";');
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_active_parkings_status";');
    }
  }
};
