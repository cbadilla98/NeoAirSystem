const express = require("express");
const router = express.Router();
const tipoAvionesModel = require("../models/TipoAviones");
const controller = require("../controllers/tipoAvionesController.js");

router.get("/", controller.get);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.delete("/:id", controller.delete);

// actualizar registro
router.put("/:id", controller.update);

module.exports = router;