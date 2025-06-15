const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3002;

const app = express();
app.use(express.json());

app.use(cors());

// Rotas
const usuarioRoutes = require("./src/routes/usuariosRoutes");

app.use("/usuarios", usuarioRoutes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
