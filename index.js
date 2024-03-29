
const express = require('express');
require('dotenv').config(); //ESTA LINEA ME PERMITE USAR LAS VARIABLES DE ENTORNO QUE CREE EN .ENV
//HAY QUE INSTALR DOTENV

var cors = require('cors')
// HAY QUE USAR LAS CORS

//CREAR EL SERVIDOR DE EXPRESS
const app = express();


app.use(cors());

// IMPORTAMOS LA CONFIG DE LA BD
const dbConnection = require('./db/config');

// Base De datos
dbConnection();


// CREACION Y GENERACION DE RUTAS
// DIRECTORIO PUBLICO
app.use( express.static('public')); //primer middleware


// LECTURA Y PARSEO DEL BODY, ASI PPODEMOS USAR EL REQ. BODY EN LOS CONTROLLERS Y DEMAS RUTAS
app.use( express.json() );



app.use('/api/auth', require('./routes/auth')); //MIDDLEWARE PARA LAS RUTAS DE USUARIOS



app.use('/api/events', require('./routes/events')); //MIDDLEWARE PARA LAS RUTAS DE EVENTOS


app.use('/api/users', require('./routes/users')); //MIDDLEWARE PARA LOS USUARIOS (ALUMNOS Y UN ADMIN)


app.use('/api/professors', require('./routes/professors')); //MIDDLEWARE PARA LOS PROFESORES


app.use('/api/validations', require('./routes/validations')); //MIDDLEWARE PARA LAS VALIDQCIONES


app.use('/api/documents', require('./routes/docs')); //MIDDLEWARE PARA LOOS DOCUMENTOS


app.use('/api/questions', require('./routes/questions')); //MIDDLEWARE PARA LOOS DOCUMENTOS





//ESCUCHAR PETICIONES
//BACKEND SERVER MONTADO

app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});