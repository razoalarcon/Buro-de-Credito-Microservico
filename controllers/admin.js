const BC = require('../models/modelsBC');

exports.BCinq  = function (req, res) {
    BC.find({},{_id:2.0,Nombre:1,Apellido_paterno :1, Apellido_materno:1,Razon_social:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({Nombre:1});
};
exports.bcAdd = (req, res) => {
    Bureau = new  BC({
        id_cliente: req.body.id_cliente,
        cliente: req.body.cliente,
        direccion: req.body.direccion,
        telefono: req.body.telefono     
    })
    console.log(buro);
    buro.save(function (err, client) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(buro.camp + " insertado en la coleccion ...");
    });
}