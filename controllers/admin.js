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
    customer = new  BC({
        Numero_cliente: req.body.Numero_cliente,
        Autoriza_consulta_bc: req.body.Autoriza_consulta_bc,
        Autoriza_uso_comercial: req.body.Autoriza_uso_comercial
            
    });
    
    console.log(customer);
    customer.save(function (err, client) {
        if (err) return console.error(err);
        // console.log(tour.tourName + " insertado en la coleccion tours...");
        res.send(customer.Numero_cliente + " insertado en la coleccion ...");
    });
}