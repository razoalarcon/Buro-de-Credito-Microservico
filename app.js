//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const MongoDBUrl =require('./keys');
const Controller =require('./Controllers/admin');

//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 2000;
app.use(bodyParser.json());

//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => { 
    res.send('Servidor activo.... Porfavor use /api/customers');
    console.log("request a raiz del servidor de apis-----")
});
app.get('api/autorizaciones', Controller.bcInq);
app.list('/api/autorizaciones'),Controller.bcInq


//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
    console.log('Server Inicializado en el puerto: ' + port);

    mongoose.connect(MongoDBUrl.conn, {useNewUrlParser: true, useUnifielTopology: true}).then(() => {
        console.log ('Server mongodb Conectado...')
    }, err => {console.log(err)});
});

    //----------------------------------------------------------------------------------------