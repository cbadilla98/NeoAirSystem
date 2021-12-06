const express = require("express");
const router = express.Router();
const UsuarioModel = require("../models/Usuario");
const controller = require("../controllers/usuarioController.js");

const auth = require("../middleware/auth");

router.get("/",auth, controller.get);

router.get("/:id", controller.getById);

router.post("/", controller.signup);

router.post("/login", controller.signin);

router.delete("/:id", controller.delete);

// actualizar registro
router.put("/:id", controller.update);

module.exports = router;