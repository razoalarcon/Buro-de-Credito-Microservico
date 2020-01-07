# Buro-de-Credito-Microservico

_Implementación con Node Js, Express, MVC, con acceso authenticado_

_Este proyecto puedes validarlo de 2 formas, en SERVIDOR LOCAL y con CONTENEDORES_

### Pre-requisitos 📋

_Que cosas necesitarás_

```
Framework Node Js

Docker
Editor de código (Visual Code)
Git
Postman
Cuenta en GitHub
```
### Crear estructura del proyecto


_Estructura general inicial_

```
Buro-de-Credito-Microservico
    controllers
      admin.js
    models
      BC.js
    app.js
    keys.js

```
# SERVIDOR LOCAL

_Crear BD mongo shell_

```
> use customer 
```
_Insertar documento_

```
> db.customer.insert({"Numero_cliente": 1, "Autoriza_consulta_bc": true, "Autoriza_uso_comercial": true})   
```


_Cadena de conexion_

_Cuando se pase al contenedor cambiar localhost al nombre del servidor (contenedor) del compose_

> Local

```javascript
const DbConnection='mongodb://localhost:27017/customer';
```
_API get_

```javascript
app.get('/api/autorizaciones', Controller.bcinq);
```
_API post_

```javascript
app.post('/api/autorizaciones', Controller.bcAdd);
```

_En el controller el archivo admin.js, estarán las funciones_

```javascript
const BC = require('../models/BC');

exports.bcinq  = function (req, res) {
    BC.find({},{Numero_cliente:1,Autoriza_consulta_bc:1, Autoriza_uso_comercial:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({Numero_cliente:1});
};
exports.bcAdd = (req, res) => {
    buro = new  BC({
        Numero_cliente: req.body.Numero_cliente,
        Autoriza_consulta_bc: req.body.Autoriza_consulta_bc,
        Autoriza_uso_comercial: req.body.Autoriza_uso_comercial
            
    });
    
    console.log(buro);
    buro.save(function (err, client) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(buro.Numero_cliente + " insertado en la coleccion ...");
    });
}
```
_En el  el archivo BC.js, estará el esquema de la base de datos creada en Mongo Shell_

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerModel = new Schema({
  //  _id : { type: Number, required: true},
    Numero_cliente: { type: Number, required: true},
    Autoriza_consulta_bc: { type: Boolean, required: false},
    Autoriza_uso_comercial: {type: Boolean, required: false},
},{collection:'customer'});

module.exports = mongoose.model('customer', customerModel);
```

_Resumen de creación_

> * Crear el código de controller
> * Crear BD mongodb
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar el servicio
> * Editar el package.json en la línea script: "start":"node app.js"
> * Crear el esquema de la BD a usar

_Encender puerto y servidor mongo en la Terminal_

```Terminal
node app.js
```

# CONTENEDORES
_cadena de conexion,considerando el usuario y password_

```javascript
const DbConnection='mongodb://apiuser:apipassword@mongoserver:27017/customer';
```
_API get_

```javascript
app.get('/api/autorizaciones', Controller.bcinq);
```
_API post_

```javascript
app.post('/api/autorizaciones', Controller.bcAdd);
```

_En el controller el archivo admin.js, estarán las funciones_

```javascript
exports.bcinq  = function (req, res) {
    BC.find({},{Numero_cliente:1,Autoriza_consulta_bc:1, Autoriza_uso_comercial:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({Numero_cliente:1});
};
exports.bcAdd = (req, res) => {
    buro = new  BC({
        Numero_cliente: req.body.Numero_cliente,
        Autoriza_consulta_bc: req.body.Autoriza_consulta_bc,
        Autoriza_uso_comercial: req.body.Autoriza_uso_comercial
            
    });
    
    console.log(buro);
    buro.save(function (err, client) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(buro.Numero_cliente + " insertado en la coleccion ...");
    });
}
```

### Crear el archivo de inicio de la bd

_Estructura mongo-init.js_

```javascript
//Crear el usuario de servicio
db.createUser({
    user: "apiuser",
    pwd:"apipassword",
    roles: [
        {
            role:"readWrite",
            db: "customer"
        }
    ]
});

//Heredar acceso de lectura escritura
db.grantRolesToUsers("apiuser",["readWrite"]);

//Habilitar uso desde Shell y cadena de conexion
db.auth('apiuser','apipassword');

//Crear la db 
db = db.getSiblingDB('customer');

//Crear colleccion y fijar creacion de db
db.catclientes_ga.insertMany([
    {
       
        "Numero_cliente": 1001,
        "Autoriza_consulta_bc": true,
        "Autoriza_uso_comercial": true
    },
    {
        "Numero_cliente": 1002,
        "Autoriza_consulta_bc": true,
        "Autoriza_uso_comercial": true
    }
]);
```

_Resumen de creación_

> * Crear el código de controller
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar el servicio
> * Editar el package.json en la línea script: "start":"node app.js"
> * Crear el archivo mongo-init.js para usuarios y carga de datos inicial
> * Crear el archivo docker-compose.yml con las instrucciones de armado


_Crear Dockerfile_

```Dockerfile
FROM  node:9-slim
RUN mkdir /src
WORKDIR /src
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 1500
CMD ["npm","start"]
```

_Crear .dockerignore para no considerar la carpeta librerías (drivers)_

```
node_modules
```

### Orquestar los servicios 🔩

_Una vez creadas las imagenes con los servicios validados, los vamos a orquestar_

_Resumen_

> * Crear el docker-compose.yml, instrucciones de armado de los contenedores
> * Corer el docker-compose.yml
> * Validar la existencia de los contenedores
> * Validar los logs de cada contenedor si están encendidos
> * Revisar los logs después de cada operación de los contenedores involucrados

_Crear docker-compose.yml al nivel del proyecto_

```
Buro-de-Credito-Microservico
    controllers
      admin.js
    models
      BC.js
    app.js
    keys.js
    mongo-init.js
    package.json
    Dockerfile
    .dockerignore
    docker-compose.yml
```

```yml
version: '3'

#Declarar los servicios
#depends_on para ligar conexion entre contenedores
#environment instrucciones para el uso de bd, usuario y pass
# adicionalamente para cargar archivo de inicializacion mongo-init.js
# en settings de docker en la pestaña share drives debe estar habilitado el drive
# de no hacerlo marca error de drive no compartido
services:
  catclientes:
    container_name: apiclientes
    image: api_clientes
    build: .
    ports:
      - '1500:1500' 
    networks:
      - domain.parties 
    depends_on:
      - database
  database:
    container_name: mongoserver
    image: mongo
    environment:
      - MONGO_INITDB_DATABASE=customer
      - MONGO_INITDB_ROOT_USERNAME=apiuser
      - MONGO_INITDB_ROOT_PASSWORD=apipassword
    volumes:
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    ports:
      - '27017:27017'
    networks:
      - domain.parties 
networks:
  domain.parties:
    external: true  


```
_Crear la red domain.parties antes correr el compose_

```Dockerfile
docker network create domain.parties
```

_Crear los contenedores al correo yml_

```Dockerfile
docker-compose up -d
```

_Validar la creación_

```Dockerfile
docker ps
```

## Desarrollo ✒️

* **Miguel Alarcon** - *Versión Inicial* - [razoalarcon](https://github.com/razoalarcon/)



