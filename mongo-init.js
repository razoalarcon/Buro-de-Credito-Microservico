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

