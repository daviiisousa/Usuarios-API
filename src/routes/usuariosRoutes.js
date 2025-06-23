const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  usuariosInativos,
} = require("../controller/userController");

const { autenticarToken } = require("../middleware/authMiddleware");

const {
  validarUsuario,
  validarLogin,
} = require("../validators/usuariosValidator");

const {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../middleware/userMiddleware");
const { loginUsuario } = require("../controller/authController");

// Rotas publicas
router.post("/user", validarUsuario, validateCreateUser, createUsuario);
router.post("/login", validarLogin, loginUsuario);

//Rotas privadas
router.get("/users", autenticarToken, getUsuarios);
router.get("/adm", autenticarToken, usuariosInativos);
router.get("/user/:id", autenticarToken, getUsuarioById);
router.delete("/user/:id", autenticarToken, validateDeleteUser, deleteUsuario);
router.put(
  "/user/:id",
  autenticarToken,
  validateUpdateUser,
  validarUsuario,
  updateUsuario
);

module.exports = router;
