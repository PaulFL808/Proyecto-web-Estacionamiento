const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static associate(models) {
    User.hasMany(models.ActiveParking, {
      foreignKey: "createdBy",
      as: "createdParkings"
    });
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash"
      },
      role: {
        type: DataTypes.ENUM("admin", "operator"),
        allowNull: false,
        defaultValue: "operator"
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true
    }
  );

  return User;
};
