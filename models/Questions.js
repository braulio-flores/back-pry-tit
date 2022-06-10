let { Schema, model} = require('mongoose');

let schema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    }
});



schema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
    // AQUI SE HACEN LAS CORRECCIONES PARA QUE EN VEZ DE SER _id SEA id, SOLO ESO
})

module.exports = model('Question', schema) ;