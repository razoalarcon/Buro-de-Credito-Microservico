const DbConnection='mongodb://localhost:27017/customer';
exports.conn=DbConnection;

//Cuando se pase al contenedor cambiar localhost al nombre del servidor (contenedor) del compose
//const DbConnection='mongodb://apiuser:apipassword@mongoserver:27017/customer

//const DbConnection = 'mongodb://mongoserver:27017/BC';
//Cadena de concexion con usuario y password