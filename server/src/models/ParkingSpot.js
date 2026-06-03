const { DataTypes, Model } = require("sequelize");

class ParkingSpot extends Model {
  static associate(models) {
    ParkingSpot.hasMany(models.ActiveParking, {
      foreignKey: "parkingSpotId",
      as: "activeParkings"
    });
  }
}

module.exports = (sequelize) => {
  ParkingSpot.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1
        }
      },
      sector: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "general"
      },
      type: {
        type: DataTypes.ENUM("standard", "disabled", "electric", "motorcycle"),
        allowNull: false,
        defaultValue: "standard"
      },
      status: {
        type: DataTypes.ENUM("available", "occupied", "maintenance", "reserved"),
        allowNull: false,
        defaultValue: "available"
      },
      hourlyRate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1500,
        field: "hourly_rate",
        validate: {
          min: 0
        }
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "ParkingSpot",
      tableName: "parking_spots",
      underscored: true
    }
  );

  return ParkingSpot;
};
