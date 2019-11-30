//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const MongoDBUrl = require('./keys');
const Controller = require('./controllers/admin');

//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 2000;
app.use(bodyParser.json());

//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
//app.get('/', (req, res) => { 
//     res.send('Servidor activo.... Porfavor use /api/customers');
//     console.log("request a raiz del servidor de apis-----")
// });
app.get('/api/autorizaciones', Controller.bcinq);
app.post('/api/autorizaciones', Controller.bcAdd);


//----------------------------------------------------------------------------------------
//4.- Encender webserver 
app.listen(port, () => {
    console.log('Server Inicializado en el puerto: ' + port);

    mongoose.connect(MongoDBUrl.conn, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log ('Server mongodb Conectado...')
    }, err => {console.log(err)});
});

    //----------------------------------------------------------------------------------------