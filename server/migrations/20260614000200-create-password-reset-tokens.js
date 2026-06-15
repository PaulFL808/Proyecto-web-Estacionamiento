"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("password_reset_tokens", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      token_hash: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      expires_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      used_at: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable("password_reset_tokens");
  }
};
