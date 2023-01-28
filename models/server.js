const express = require('express');
const cors = require('cors'); //Las CORS sirven para bloquear o permitir accesos a la aplicacion
const { repairRouter } = require('../routes/repair.routes');
const { usersRouter } = require('../routes/user.routes');
const { db } = require('../database/db');
//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3000;

    //DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      user: '/api/v1/user',
      repairs: '/api/v1/repairs',
    };

    //LLAMO EL METODO DE CONEXION A LA BASE DE DATOS
    this.database();

    //INVOCAMOS EL METODO MIDDLEWARES, se deben ejecutar antes de las rutas
    this.middlewares();

    //INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  //MIDDLEWARES
  middlewares() {
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API, metodo de seguridad restringe que los clientes hagan peticiones
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //utilizar las rutas de productos
    this.app.use(this.paths.repairs, repairRouter);
    //utilizar las rutas de usuarios
    this.app.use(this.paths.user, usersRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    // db.sync({ force: true })
    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
