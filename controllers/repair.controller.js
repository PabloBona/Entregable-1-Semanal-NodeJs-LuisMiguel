const Repair = require('../models/repair.model');

exports.findRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {},
  });

  res.status(200).json({
    status: 'success',
    message: 'The repair was found successfully',
    repairs,
  });
};

exports.findRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'The repair was found successfully',
    repair,
  });
};

exports.createRepair = async (req, res) => {
  try {
    // 1. OBTENER LA INFORMACION A GUARDAR DE LA REQ.BODY
    const { date, status, userId } = req.body;

    const newRepair = await Repair.create({
      date,
      status,
      userId,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair was created successfully',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  //1. OBTENGO MI ID DE LA REQ.PARAMS
  const { id } = req.params;
  //2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const { title, description, quantity, price } = req.body;
  //3. BUSCAR EL PRODUCTO A ACTUALIZAR
  const repair = await Repair.findOne({
    where: {
      id,
    },
  });
  //4. SI NO EXISTE EL PRODUCTO ENVIAMOS UN ERROR
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }
  //5. SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO ENCONTRADO
  const updatedRepair = await repair.update({
    status: 'completed',
  });
  //6. ENVIO LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Then repair has been updated successfully',
    updatedRepair,
  });
};

exports.deleteRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }
  const updatedRepair = await repair.update({
    status: 'Erased',
  });

  res.status(200).json({
    status: 'success',
    message: 'Then repair has been Erased successfully',
  });
};
