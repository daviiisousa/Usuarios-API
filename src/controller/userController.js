require("dotenv").config();
const Users = require("../models/userModel");

// GET Todos os usuários que estao ativo
const getUsuarios = async (req, res) => {
  try {
    // Consultar apenas usuários ativos
    const usuariosAtivos = await Users.findAll({
      where: {
        ativo: true,
      },
    });

    if (!usuariosAtivos) {
      return res
        .status(404)
        .json({ success: false, mensagem: "Nenhum usuário ativo encontrado" });
    }

    res.status(200).json({ success: true, data: usuariosAtivos });
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
    res
      .status(500)
      .json({ success: false, mensagem: "Erro ao pegar usuarios" });
  }
};

const usuariosInativos = async (req, res) => {
  try {
    // Consultar apenas usuários inativos
    const usuariosInativos = await Users.findAll({
      where: {
        ativo: false,
      },
    });

    if (!usuariosInativos) {
      return res.status(404).send({
        success: false,
        mensagem: "Nenhum usuário inativo encontrado",
      });
    }

    res.status(200).json({
      success: true,
      mensagem: "usuarios inativos",
      data: usuariosInativos,
    });
  } catch (error) {
    console.error("Erro ao buscar usuario", error);
    res
      .status(500)
      .json({ success: false, mensagem: "Erro ao pegar usuarios inativos" });
  }
};

// GET Usuário por ID
const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Users.findByPk(id);

    if (!usuario || !usuario.ativo) {
      return res.status(404).json({
        success: false,
        mensagem: "Usuário não encontrado ou inativo",
      });
    }

    res
      .status(200)
      .json({ success: true, mensagem: "Usuário encontrado", data: usuario });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao pegar usuario" });
  }
};

// POST Criar um novo usuário
const createUsuario = async (req, res) => {
  try {
    // Inserir no banco de dados
    const usuarioCriado = await Users.create(req.body);

    res.status(201).json({
      success: true,
      mensagem: "Usuário criado com sucesso",
      data: usuarioCriado,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res
      .status(500)
      .json({ succes: false, mensagem: "erro ao criar o usuario" });
  }
};

// DELETE Usuário por ID
const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.update(
      { ativo: false }, // Atualiza o campo ativo para false
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      success: true,
      mensagem: `Usuário desativado com sucesso`,
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res
      .status(500)
      .json({ success: false, mensagem: "Erro ao desativar usuário" });
  }
};

// PUT Atualizar usuário por ID
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Users.update(req.body, { where: { id } });

    res.status(200).json({
      success: true,
      mensagem: "Usuário atualizado com sucesso",
      data: usuario,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res
      .status(500)
      .json({ success: false, mensagem: "Erro ao atualizar usuário" });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  usuariosInativos,
};
