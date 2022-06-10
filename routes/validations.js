/* 
    RUTAS DE EVENTS /professors
    MAIN: host + /api/professors
*/
const express = require("express");
const { createValidation, getValidations, updateValidation } = require("../controllers/validations");
const router = express.Router();

//ROUTA PARA UN NUEVO EVENTO
router.post("/", [], createValidation);

// //ROUTA PARA OBTENER TODOS LOS EVENTOS
router.get("/", [], getValidations);

//ROUTA PARA OBTENER UN  EVENTO
// router.get("/:id", [], getStudent);

// //ROUTA PARA ACTUALIZAR UN EVENTO
router.put("/:id", [], updateValidation);

// //ROUTA PARA ELIMINAR UN EVENTO
// router.delete("/:id", [], deleteEvent);

module.exports = router;
