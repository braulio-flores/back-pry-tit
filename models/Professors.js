let { Schema, model} = require('mongoose');

let schema = new Schema({
    boleta: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    academy: {
        type: String,
        required: true,
    },
    vacants: {
        type: Number,
        required: true,
    },
    disponibility: {
        type: Boolean,
        required: true,
    },
    contact: {
        mail: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
    }
});


schema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
    // AQUI SE HACEN LAS CORRECCIONES PARA QUE EN VEZ DE SER _id SEA id, SOLO ESO
})

module.exports = model('Professor', schema) ;