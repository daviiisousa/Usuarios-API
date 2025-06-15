const jwt = require("jsonwebtoken");
require("dotenv").config();

const autenticarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  try {
    //decodifica o token e verfica se existe a assinatura igual a do env
    const usuario = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = usuario; // Adiciona os dados do usuário no request
    next();
  } catch (error) {
    res.status(403).json({ mensagem: "Token inválido", error: error });
  }
};

module.exports = { autenticarToken };
