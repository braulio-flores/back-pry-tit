const { response } = require("express");
//ESTO ES PARA QUE PODAMOS TENER EL INTELLICENSE

const Professor = require("../models/Professors");

//! ESTE ES EL PRIMER CONTROLADOR DE CREAR NUEVO STUDENT (SOLO PARA POSTMAN PORQUE DESDE LA PAGINA NO SE USA)
const createProfessor = async (req, res = response) => {

  const prof = new Professor(req.body);

  try {

    // student.user = req.uid;
    // LE INDICAMOS EL UID DEL USER, ESTE UID LO GUARDAMOS EN EL REQ CUANDO PASA POR EL VALIDATE TOKEN

    const eventDB = await prof.save();
    res.status(200).json({
      ok: true,
      msg: "Profesor Created",
      eventDB
    });

  } catch (error) {

    // console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Prof Creation failed",
      req
    });

  }

};

//! ESTE ES EL CONTROLADOR PARA OBTENER UN ESTUDIANTE
const getStudent = async (req, res = response) => {

  try {
    const idStudent = req.params.id;
    let findStudent = await Student.find({ 'boleta': idStudent });
    if (!findStudent) {
      return res.status(400).json({
        ok: false,
        msg: "The student doesn't exist",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Show Student",
      student: findStudent,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      ok: false,
      msg: "An error ocurred while find the student",
    });
  }
};

//! ESTE ES EL CONTROLADOR PARA OBTENER LOS PROFESORES
const getProfessors = async (req, res = response) => {

  try {
    const professors = await Professor.find();

    return res.status(200).json({
      ok: true,
      msg: "Show Professors",
      professors
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
const updateProfessor = async (req, res = response) => {

  const idProfessor = req.params.id;

  try {


    const prof = await Professor.findOne({"boleta": idProfessor});
    if (!prof) {
      return res.status(404).json({
        ok: false,
        msg: "The Professor doesn´t exist",
      });
    }


    const nuevoProf = {
      ...req.body,
    }


    // // const profUpdated = await Professor.findByIdAndUpdate(idEvent, nuevoEvento, {new:true});
    const profUpdated = await Professor.findOneAndUpdate({"boleta":idProfessor}, nuevoProf, {new:true});


    res.status(200).json({
      ok: true,
      msg: "Prof Updated",
      profUpdated
    });
    
  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "The Prof couldn´t be Updated",
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
  createProfessor,
  getProfessors,
  getStudent,
  updateProfessor,
  deleteEvent,
};
