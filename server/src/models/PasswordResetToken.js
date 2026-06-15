const { DataTypes, Model } = require("sequelize");

class PasswordResetToken extends Model {
  static associate(models) {
    PasswordResetToken.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
  }
}

module.exports = (sequelize) => {
  PasswordResetToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id"
      },
      tokenHash: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        field: "token_hash"
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expires_at"
      },
      usedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "used_at"
      }
    },
    {
      sequelize,
      modelName: "PasswordResetToken",
      tableName: "password_reset_tokens",
      underscored: true
    }
  );

  return PasswordResetToken;
};
