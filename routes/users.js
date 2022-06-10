/* 
    RUTAS DE EVENTS /professors
    MAIN: host + /api/professors
*/
const express = require("express");
const router = express.Router();
const { createStudent, getStudent, getStudents, updateStudent } = require("../controllers/users");

//ROUTA PARA UN NUEVO EVENTO
router.post("/", [], createStudent);

// //ROUTA PARA OBTENER TODOS LOS EVENTOS
router.get("/", [], getStudents);

//ROUTA PARA OBTENER UN  EVENTO
router.get("/:id", [], getStudent);

// //ROUTA PARA ACTUALIZAR UN EVENTO
router.put("/:id", [], updateStudent);

// //ROUTA PARA ELIMINAR UN EVENTO
// router.delete("/:id", [], deleteEvent);

module.exports = router;
