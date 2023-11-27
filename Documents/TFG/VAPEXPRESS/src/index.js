const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const clienteRoutes  = require('./routes/clientes.routes');

const app = express();
app.use(cors()); //Permite comunicar front y back

app.use(morgan('dev'));

app.use(express.json());

//Utilizamos la ruta de cliente
app.use(clienteRoutes);
/* Video minuto 1:17 MiddleWare 
app.use((err,req,res,next)=>{
    return res.json({
        message: err.message
    });
});*/
app.listen(3000);
console.log('server on port 3000');