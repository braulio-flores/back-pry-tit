let { Schema, model} = require('mongoose');

let schema = new Schema({
    responsible: {
        type: String,
        required: true,
    },
    validated: {
        type: Boolean,
    },
    boleta: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
    retry: {
        type: Boolean,
    }
});

// {
//     boleta: 2019111222,
//     name: "ALUMNO APELLIDOS APELLIDOS",
//     carrera: "Ingenieria en Informatica",
//     responsible: "RESPONSABLE APELLIDOS APELLIDOS",
//     validated: false,
//   },


schema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
    // AQUI SE HACEN LAS CORRECCIONES PARA QUE EN VEZ DE SER _id SEA id, SOLO ESO
})

module.exports = model('Validation', schema) ;