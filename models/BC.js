const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerModel = new Schema({
  //  _id : { type: Number, required: true},
    Numero_cliente: { type: Number, required: true},
    Autoriza_consulta_bc: { type: Boolean, required: false},
    Autoriza_uso_comercial: {type: Boolean, required: false},
},{collection:'customer'});

module.exports = mongoose.model('customer', customerModel);
