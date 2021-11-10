const express = require("express");
const router = express.Router();
const UsuarioModel = require("../models/Usuario");
const controller = require("../controllers/usuarioController.js");

router.get("/", controller.get);

router.get("/:id", controller.getById);

router.post("/", controller.signup);

router.delete("/:id", controller.delete);

// actualizar registro
router.put("/:id", controller.update);

module.exports = router;