const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const users = await User.findAll({
      where: {},
    });
    if (!users) {
      return res.status(404).json({
        status: 'error',
        message: 'None Users was found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;

    // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        id,
      },
    });

    // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
    role: role,
  });
  res.status(201).json({
    status: 'succes',
    message: 'User Created succesfully',
    user,
  });
};
const updateUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { name, email } = req.body;
    // 3. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        id,
      },
    });
    //4. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    await user.update({ name, email });
    // 6. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail updating user',
      message: 'Internal server error',
    });
  }
};

// const deleteUser = async (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'User deleted successfully',
//   });
// };

const deleteUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { name, email } = req.body;
    // 3. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        id,
      },
    });
    //4. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    const eraseUser = await user.update({
      status: 'erased',
      password: 'This USER has been erased',
    });
    // 6. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User deleted (Status Change) successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail updating user',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
