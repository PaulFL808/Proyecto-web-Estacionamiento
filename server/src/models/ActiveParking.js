const { DataTypes, Model } = require("sequelize");

class ActiveParking extends Model {
  static associate(models) {
    ActiveParking.belongsTo(models.ParkingSpot, {
      foreignKey: "parkingSpotId",
      as: "parkingSpot"
    });

    ActiveParking.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "creator"
    });
  }
}

module.exports = (sequelize) => {
  ActiveParking.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      parkingSpotId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "parking_spot_id"
      },
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false
      },
      driverName: {
        type: DataTypes.STRING(120),
        allowNull: true,
        field: "driver_name"
      },
      vehicleType: {
        type: DataTypes.ENUM("car", "motorcycle", "truck"),
        allowNull: false,
        defaultValue: "car",
        field: "vehicle_type"
      },
      checkInAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "check_in_at"
      },
      expectedExitAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "expected_exit_at"
      },
      checkOutAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "check_out_at"
      },
      durationMinutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "duration_minutes",
        validate: {
          min: 0
        }
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "total_amount",
        validate: {
          min: 0
        }
      },
      status: {
        type: DataTypes.ENUM("active", "finished", "cancelled"),
        allowNull: false,
        defaultValue: "active"
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "created_by"
      }
    },
    {
      sequelize,
      modelName: "ActiveParking",
      tableName: "active_parkings",
      underscored: true
    }
  );

  return ActiveParking;
};
