module.exports = (sequelize, DataTypes) => {
  const PaymentCondition = sequelize.define('PaymentCondition', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
  });

  return PaymentCondition;
};
