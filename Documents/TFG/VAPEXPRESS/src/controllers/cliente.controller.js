const { query, checkSchema,check } = require('express-validator');
const {addClienteBD, listarClientesBD, obtenerClienteBD,comprobarLoginBD, deleteClienteBD, actualizarClienteBD} = require('../models/cliente.model')

//Obtenemos todo los clientes 
const getListaClientes = async (req, res)=>{
    try{
        const listaClientes = await listarClientesBD();
        res.json(listaClientes);
        console.log(listaClientes)
        
    }catch(error){
        res.status(500).json({ error: "Error al obtener la lista de clientes" });
    }


};
//Obtenemos un cliente de la base de datos segun su nombre de ususuario => ERROR 404 SI NO SE ENCUENTRA UN CLIENTE CON ESE ID
const getCliente =async (req,res)=>{
    
    const {usuario} = req.params;
    try{
        const cliente = await obtenerClienteBD(usuario);
        if(cliente.length === 0 ) return res.status(404).json({message: 'Cliente no encontrado'}); // Si no se encuentra un usuario 
        res.json(cliente);
        console.log(cliente)

    }catch(error){
        res.status(500).json({ error: "Error al obtener la lista de clientes" });
    }
};

const comprobarLogin = async(req,res)=>{
    const {correo_electronico, contrasena} = req.body;
        console.log(correo_electronico+contrasena)
    try{
        const cliente = await comprobarLoginBD(correo_electronico,contrasena);

        if(cliente.length === 0 ) {
            return res.status(404).json({message: 'El correo electrónico y contraseña no coinciden'}); //Np
        }else{
            res.json(cliente);
            console.log(cliente)
            return cliente;
        }
        


    }catch(error){
        res.status(500).json({ error: "El nombre de usuario y la contraseña no coinciden" });
    }

};

const addCliente = async (req,res)=>{
    const { usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento } = req.body
    console.log( usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento )
    //Consultamos al modelo
    let result = await addClienteBD(usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento);
    res.json(result);
    console.log(result)

};

const removeCliente =async (req,res)=>{


    const {nombreUsuario} = req.params;
    try{
        
        const result = await deleteClienteBD(nombreUsuario);
        if(result ===0){
            res.json("El nombre de usuario introducido no existe.");
            //res.sendStatus(204)
        }else{
            res.json("El usuario se ha eliminado correctamente");
        }
    }catch(error){
        res.status(500).json({error: 'El nombre de usuario introducido no existe'});
    }

};

const actualizarCliente = async (req,res)=>{
    
    try{
        const { usuario } = req.params;

        const {nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento } = req.body;
        
        const result = await actualizarClienteBD(usuario,nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento);

        console.log(result);

        if(result.length === 0)
            return res.status(404).json({message : "Nombre de usuario no existe"});

        return res.json(result);

    }catch(error){
        res.status(500).json({error: 'El nombre de usuario introducido no  existe'});
    }


};



module.exports = {
    getCliente,
    getListaClientes,
    addCliente, 
    removeCliente,
    actualizarCliente,
    comprobarLogin

}