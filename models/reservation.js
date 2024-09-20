// models/Reservation.js

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    checkin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdGuest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    qtdChild: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stand: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Standart",
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Solteiro",
    },
    guest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requesterName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVoucher: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Aberta", "Cancelada", "Finalizada"),
      defaultValue: "Aberta",
    },
    totalValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    paymentConditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Reservation.associate = (models) => {
    // Associação com o usuário que criou a reserva
    Reservation.belongsTo(models.User, { foreignKey: "userId", as: "user" });

    // Associação com a condição de pagamento
    Reservation.belongsTo(models.PaymentCondition, {
      foreignKey: "paymentConditionId",
      as: "paymentCondition",
    });

    // Associação muitos-para-muitos com produtos
    Reservation.belongsToMany(models.Product, {
      through: models.ReservationProducts,
      foreignKey: "reservationId",
      otherKey: "productId",
      as: "products",
    });
  };

  return Reservation;
};
