const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

async function validateCreateUser(req, res, next) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      success: false,
      mensagem: "Todos os campos são obrigatórios",
    });
  }

  if (nome.length > 255) {
    return res.status(400).json({
      success: false,
      mensagem: "O nome não pode ter mais que 255 caracteres",
    });
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ mensagem: "A senha deve ter pelo menos 6 caracteres" });
  }

  if (email.length > 255) {
    return res.status(400).json({
      success: false,
      mensagem: "O email não pode ter mais que 255 caracteres",
    });
  }

  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      mensagem: "Já existe um usuário cadastrado com esse email",
    });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  req.body.senha = hashedPassword;

  next();
}

async function validateDeleteUser(req, res, next) {
  const { id } = req.params;

  const usuario = await Users.findByPk(id);

  if (!usuario) {
    return res
      .status(404)
      .json({ success: false, mensagem: "Usuário não encontrado" });
  }

  if (usuario.ativo === false) {
    return res
      .status(400)
      .json({ success: false, mensagem: "Usuário já está inativo" });
  }
  next();
}

async function validateUpdateUser(req, res, next) {
  const { id } = req.params;
  const { senha } = req.body;

  const usuario = await Users.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      success: false,
      mensagem: "Usuário não encontrado",
    });
  }

  if (!senha) {
    return res.status(400).json({
      success: false,
      mensagem: "Senha é obrigatória para atualização",
    });
  }

  const senhaHasheada = senha && (await bcrypt.hash(senha, 10));

  req.body.senha = senhaHasheada;

  next();
}

module.exports = {
  validateCreateUser,
  validateDeleteUser,
  validateUpdateUser,
};
