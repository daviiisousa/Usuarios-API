const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Users = sequelize.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Users;
