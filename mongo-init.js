//Crear el usuario de servicio
db.createUser({
    user: "apiuser",
    pwd:"apipassword",
    roles: [
        {
            role:"readWrite",
            db: "galeria"
        }
    ]
});

//Heredar acceso de lectura escritura
db.grantRolesToUsers("apiuser",["readWrite"]);

//Habilitar uso desde Shell y cadena de conexion
db.auth('apiuser','apipassword');

//Crear la db 
db = db.getSiblingDB('galeria');

//Crear colleccion y fijar creacion de db
db.catclientes_ga.insertMany([
{
    
}

]);
