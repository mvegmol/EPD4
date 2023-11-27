//Vamos a crear las rutas que front va a poder utilizar para realizar operaciones

const { Router } = require('express');
const { getListaClientes, getCliente, addCliente, removeCliente, actualizarCliente, comprobarLogin } = require('../controllers/cliente.controller');


const router = Router();

//Retornar cliente: le ponemos ususuario porque es lo que esperamos que devuelva para obtener la informacion sobre el cliente
router.get('/clientes/:usuario',getCliente);


//Lista de clientes
router.get('/clientes',getListaClientes);

//Crear clientes
router.post('/clientes',addCliente);


//Eliminar cliente
router.delete('/clientes/:nombreUsuario',removeCliente);

//Actualizar cliente
router.put('/clientes/:usuario', actualizarCliente)

//Comprobar usuario y contraseña coinciden
router.post('/login', comprobarLogin);

module.exports = router;