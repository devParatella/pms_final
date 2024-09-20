const {
  Reservation,
  Product,
  User,
  PaymentCondition,
  ReservationProducts,
  sequelize,
} = require("../models");

exports.create = async (req, res) => {
  const transaction = await sequelize.transaction(); // Adicionando transações

  try {
    const {
      userId,
      checkin,
      checkout,
      duration,
      qtdGuest,
      qtdChild,
      stand,
      tipo,
      guest,
      requesterName,
      companyName,
      phone,
      email,
      emailVoucher,
      eventType,
      observations,
      products,
      status,
      paymentConditionId,
      totalValue,
    } = req.body;

    // Validação de campos obrigatórios
    if (
      !userId ||
      !checkin ||
      !checkout ||
      !guest ||
      !totalValue ||
      !paymentConditionId
    ) {
      throw new Error("Campos obrigatórios estão faltando.");
    }

    // Criar a reserva inicial
    const reservation = await Reservation.create(
      {
        userId,
        checkin,
        checkout,
        duration,
        qtdGuest,
        qtdChild,
        stand,
        tipo,
        guest,
        requesterName,
        companyName,
        phone,
        email,
        emailVoucher,
        eventType,
        observations,
        status,
        paymentConditionId,
        totalValue,
      },
      { transaction }
    );

    // Adicionar produtos à reserva
    if (products && products.length > 0) {
      const productEntries = products.map((product) => ({
        reservationId: reservation.id,
        productId: product.id,
      }));
      await ReservationProducts.bulkCreate(productEntries, { transaction });
    }

    await transaction.commit(); // Confirma a transação
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Erro ao criar a reserva:", error); // Loga o erro no terminal
    await transaction.rollback(); // Reverte a transação em caso de erro
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({ include: Product });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id, { include: Product });
    if (!reservation) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const transaction = await sequelize.transaction(); // Transação para a atualização

  try {
    const { id } = req.params;
    const {
      status,
      productIds,
      checkin,
      checkout,
      duration,
      qtdGuest,
      qtdChild,
      stand,
      tipo,
      guest,
      requesterName,
      companyName,
      phone,
      email,
      emailVoucher,
      eventType,
      observations,
      paymentConditionId,
      totalValue,
    } = req.body;

    const reservation = await Reservation.findByPk(id, { include: Product });
    if (!reservation) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    // Atualizar dados da reserva
    await reservation.update(
      {
        status,
        checkin,
        checkout,
        duration,
        qtdGuest,
        qtdChild,
        stand,
        tipo,
        guest,
        requesterName,
        companyName,
        phone,
        email,
        emailVoucher,
        eventType,
        observations,
        paymentConditionId,
        totalValue,
      },
      { transaction }
    );

    // Atualizar produtos da reserva
    if (productIds && productIds.length > 0) {
      await ReservationProducts.destroy({
        where: { reservationId: id },
        transaction,
      });
      const newProducts = productIds.map((productId) => ({
        reservationId: id,
        productId: productId,
      }));
      await ReservationProducts.bulkCreate(newProducts, { transaction });
    }

    await transaction.commit();
    res.status(200).json(reservation);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
