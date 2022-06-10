const { response } = require("express");
//ESTO ES PARA QUE PODAMOS TENER EL INTELLICENSE

const Validation = require("../models/Validations");
const Student = require("../models/Student");

//! ESTE ES EL PRIMER CONTROLADOR DE CREAR NUEVO EBENTO
const createValidation = async (req, res = response) => {

  const validation = new Validation(req.body);

  try {

    // LE INDICAMOS EL UID DEL USER, ESTE UID LO GUARDAMOS EN EL REQ CUANDO PASA POR EL VALIDATE TOKEN

    const eventDB = await validation.save();
    res.status(200).json({
      ok: true,
      msg: "Validation Created",
      eventDB
      
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Validation Creation Failed",
      req
    });

  }

};


//! ESTE ES EL CONTROLADOR PARA OBTENER LOS PROFESORES
const getValidations = async (req, res = response) => {

  try {
    const validations = await Validation.find();

    return res.status(200).json({
      ok: true,
      msg: "Show Validations",
      validations
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "The professors couldn´t be loaded",
    });
  }

};

//! ESTE ES EL CONTROLADOR PARA ACTUALIZAR LOS EVENTOS
const updateValidation = async (req, res = response) => {

  const idStudent = req.params.id;

  try {


    const student = await Student.findOne({"boleta": idStudent});
    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: "The Student doesn´t exist",
      });
    }


    const newValidation = {
      ...req.body,
    }


    // // const profUpdated = await Professor.findByIdAndUpdate(idEvent, nuevoEvento, {new:true});
    const validationUpdated = await Validation.findOneAndUpdate({"boleta":idStudent}, newValidation, {new:true});


    res.status(200).json({
      ok: true,
      msg: "Validation Updated",
      validationUpdated
    });
    
  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "The Validation couldn´t be Updated",
    });
  }

  
};

//! ESTE ES EL CONTROLADOR PARA ACTUALIZAR LOS EVENTOS
const deleteEvent = async (req, res = response) => {

  const idEvent = req.params.id;

  try {

    const findEvent = await Event.findById(idEvent);

    if (!findEvent) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesn´t exist",
      });
    }

    if (findEvent.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "You can´t delete this event",
      });
    }

    await Event.findByIdAndDelete(idEvent);

    return res.status(200).json({
      ok: true,
      msg: "Evenmt deleted",
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "The event could´t be deleted",
    });
  }

};

module.exports = {
  createValidation,
  getValidations,
  updateValidation,
  deleteEvent,
};
