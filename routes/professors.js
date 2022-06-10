/* 
    RUTAS DE EVENTS /users
    MAIN: host + /api/users
*/
const express = require("express");
const { createProfessor, getProfessors, updateProfessor } = require("../controllers/professors");
const router = express.Router();


//ROUTA PARA UN NUEVO PROFESOR
router.post("/", [], createProfessor);

//ROUTA PARA OBTENER TODOS LOS EVENTOS
router.get("/", [], getProfessors);

//ROUTA PARA OBTENER UN  EVENTO
// router.get("/:id", [], getStudent);

//ROUTA PARA ACTUALIZAR UN EVENTO
router.put("/:id", [], updateProfessor);

// //ROUTA PARA ELIMINAR UN EVENTO
// router.delete("/:id", [], deleteEvent);

module.exports = router;
