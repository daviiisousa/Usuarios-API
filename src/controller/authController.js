const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Users.findOne({
      where: { email, ativo: true },
    });

    if (senha.length < 6) {
      return res.status(400).json({
        success: false,
        mensagem: "A senha deve ter pelo menos 6 caracteres",
      });
    }

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensagem: "Usuário não encontrado ou inativo",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ success: false, mensagem: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      success: true,
      mensagem: "Login bem-sucedido",
      token: token,
      data: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ success: false, mensagem: "Erro no servidor" });
  }
};

module.exports = {
  loginUsuario,
};
