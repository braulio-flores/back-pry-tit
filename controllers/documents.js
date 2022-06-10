const { response } = require("express");
//ESTO ES PARA QUE PODAMOS TENER EL INTELLICENSE

const Document = require("../models/Documents");
const Student = require("../models/Student");

//! ESTE ES EL PRIMER CONTROLADOR DE CREAR NUEVO EBENTO
const createDocRequest = async (req, res = response) => {

  const doc = new Document(req.body);

  try {

    // LE INDICAMOS EL UID DEL USER, ESTE UID LO GUARDAMOS EN EL REQ CUANDO PASA POR EL VALIDATE TOKEN

    const eventDB = await doc.save();
    res.status(200).json({
      ok: true,
      msg: "Doc Request Created",
      eventDB
      
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Doc Request Creation Failed",
      req
    });

  }

};


//! ESTE ES EL CONTROLADOR PARA OBTENER LOS PROFESORES
const getDocumentsReq = async (req, res = response) => {

  try {
    const docs = await Document.find();

    return res.status(200).json({
      ok: true,
      msg: "Show Documents",
      docs
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "The documents couldn´t be loaded",
    });
  }

};

//! ESTE ES EL CONTROLADOR PARA ACTUALIZAR LOS EVENTOS
const updateDocReq = async (req, res = response) => {

  const idStudent = req.params.id;

  try {


    const student = await Document.findOne({"boleta": idStudent});
    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: "The Student doesn´t exist",
      });
    }


    const newDocReq = {
      ...req.body,
    }


    // // const profUpdated = await Professor.findByIdAndUpdate(idEvent, nuevoEvento, {new:true});
    const docReqUpdated = await Document.findOneAndUpdate({"boleta":idStudent}, newDocReq, {new:true});


    res.status(200).json({
      ok: true,
      msg: "Doc Req Updated",
      docReqUpdated
    });
    
  } catch (error) {

    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "The Doc Request couldn´t be Updated",
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
  createDocRequest,
  getDocumentsReq,
  updateDocReq,
  deleteEvent,
};
