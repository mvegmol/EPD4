const pool = require('../db');

//Crear un metodo para añadir a la base de datos del cliente

const addClienteBD =async (usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento) =>{
    try{
        const sql = 'INSERT INTO clientes (usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento) VALUES($1,$2,$3,$4,$5,$6,$7)';
        const values = [usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento];
        const res =await  pool.query(sql,values);
        return res.rows[0];
    }catch(error){
        return ({error: error.message});
    }
};
//Obtenemos todos los clientes de la base de datos 
const listarClientesBD = async() =>{
    try{
        const res = await pool.query("SELECT * FROM clientes");
        return res.rows;
    }catch(error){
        reutrn ({error: error.message});
    }
    
}

//Obtenemos un cliente segun un usuario
const obtenerClienteBD = async(usuario) =>{
    try{

        const res =await pool.query('SELECT * FROM clientes WHERE usuario = $1',[usuario]);
        return res.rows[0];

    }catch(error){
        return ({error: error.message});
    }
};

//Comprobar que las credenciales introducidas son correctas
const comprobarLoginBD = async( correo_electronico,pass) =>{
    try{
        
        const res = await pool.query('SELECT * FROM clientes WHERE correo_electronico = $1 and contrasena = $2',[correo_electronico,pass]);
        return res.rows[0];

    }catch(error){
        return ({error: error.message});
    }
};
//ELiminamos un  cliente de la base de datos segun un nombre de usuario
const deleteClienteBD = async (usuario)=>{
    try{

        const res = await pool.query('DELETE FROM clientes WHERE usuario = $1',[usuario]);
        if(res.rowCount >0){
            return 1;
        }else{
            return 0;
        }
        
        
    }catch(error){

        return ({error:error.message})
    }

};
//Actualizamos un cliente de la base de datos 
const actualizarClienteBD = async (usuario, nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento)=>{
    try{
        const res = await pool.query('UPDATE clientes SET nombre = $1, contrasena = $2, apellidos =$3, telefono = $4, correo_electronico =$5, fecha_nacimiento = $6 WHERE usuario = $7 RETURNING *',[nombre, contrasena, apellidos, telefono, correo_electronico, fecha_nacimiento,usuario]);
        
        return res.rows[0];

    }catch(error){

        return ({error:error.message})
    }

};


module.exports = {
    addClienteBD,
    listarClientesBD,
    obtenerClienteBD,
    comprobarLoginBD,
    deleteClienteBD,
    actualizarClienteBD
}