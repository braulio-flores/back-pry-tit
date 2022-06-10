/* 
    RUTAS DE EVENTS /professors
    MAIN: host + /api/professors
*/
const express = require("express");
const { createDocRequest, getDocumentsReq, updateDocReq } = require("../controllers/documents");
const router = express.Router();

//ROUTA PARA UN NUEVO EVENTO
router.post("/", [], createDocRequest);

// //ROUTA PARA OBTENER TODOS LOS EVENTOS
router.get("/", [], getDocumentsReq);

//ROUTA PARA OBTENER UN  EVENTO
// router.get("/:id", [], getStudent);

// //ROUTA PARA ACTUALIZAR UN EVENTO
router.put("/:id", [], updateDocReq);

// //ROUTA PARA ELIMINAR UN EVENTO
// router.delete("/:id", [], deleteEvent);

module.exports = router;
