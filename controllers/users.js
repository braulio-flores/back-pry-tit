const { response } = require("express");
//ESTO ES PARA QUE PODAMOS TENER EL INTELLICENSE

const Student = require("../models/Student");

//! ESTE ES EL PRIMER CONTROLADOR DE CREAR NUEVO STUDENT (SOLO PARA POSTMAN PORQUE DESDE LA PAGINA NO SE USA)
const createStudent = async (req, res = response) => {

  const student = new Student(req.body);

  try {

    // student.user = req.uid;
    // LE INDICAMOS EL UID DEL USER, ESTE UID LO GUARDAMOS EN EL REQ CUANDO PASA POR EL VALIDATE TOKEN

    const eventDB = await student.save();
    res.status(200).json({
      ok: true,
      msg: "Student Created",
      eventDB
    });

  } catch (error) {

    // console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Event Creation failed",
      req
    });

  }

};

//! ESTE ES EL CONTROLADOR PARA OBTENER UN ESTUDIANTE
const getStudent = async (req, res = response) => {

  try {
    const idStudent = req.params.id;
    let findStudent = await Student.findOne({ 'boleta': idStudent });
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


//! ESTE ES EL CONTROLADOR PARA OBTENER UN ESTUDIANTE
const getStudents = async (req, res = response) => {

  try {
    let findStudents = await Student.find();

    res.status(200).json({
      ok: true,
      msg: "Show Students",
      student: findStudents,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      ok: false,
      msg: "An error ocurred while find the students",
    });
  }
};

//! ESTE ES EL CONTROLADOR PARA OBTENER LOS EVENTOS
const getEvents = async (req, res = response) => {

  try {
    const events = await Event.find()
                              .populate('user','name');

    return res.status(200).json({
      ok: true,
      msg: "Show Events",
      events
    });

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "The events couldn´t be loaded",
    });
  }

};

//! ESTE ES EL CONTROLADOR PARA ACTUALIZAR LOS EVENTOS
const updateStudent = async (req, res = response) => {

  const idStudent = req.params.id;

  try {

    const student = await Student.findOne({'boleta':idStudent});
    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: "The Student doesn´t exist",
      });
    }

    const nuevoStudent = {
      ...req.body,
    }

    const studentUpdated = await Student.findOneAndUpdate({'boleta':idStudent}, nuevoStudent, {new:true});


    res.status(200).json({
      ok: true,
      msg: "Student Updated",
      studentUpdated
    });
    
  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "The Student couldn´t be Updated",
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
  createStudent,
  getEvents,
  getStudent,
  updateStudent,
  deleteEvent,
  getStudents
};
