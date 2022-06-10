/* 
    RUTAS DE EVENTS /professors
    MAIN: host + /api/professors
*/
const express = require("express");
const { createQuestion, getQuestions } = require("../controllers/questions");
const router = express.Router();

//ROUTA PARA UN NUEVO EVENTO
router.post("/", [], createQuestion);

// //ROUTA PARA OBTENER TODOS LOS EVENTOS
router.get("/", [], getQuestions);

//ROUTA PARA OBTENER UN  EVENTO
// router.get("/:id", [], getStudent);

// //ROUTA PARA ACTUALIZAR UN EVENTO
// router.put("/:id", [], updateDocReq);

// //ROUTA PARA ELIMINAR UN EVENTO
// router.delete("/:id", [], deleteEvent);

module.exports = router;
