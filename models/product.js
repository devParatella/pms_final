module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    daylyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, 
);

  Product.associate = (models) => {
    Product.belongsToMany(models.Reservation, {
      through: models.ReservationProducts,
      foreignKey: 'productId',
      otherKey: 'reservationId',
    });
  };

  return Product;
};
