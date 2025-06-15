const { getUsuarios } = require("./userController"); //pegamos a função getUsuarios
const db = require("../config/db"); // pegamos a conexao com o banco de dados

jest.mock("../config/db"); // Simula o banco de dados

test("deve retornar usuários ativos", async () => {
  const req = {}; // Nenhum parâmetro necessário
  const res = {
    status: jest.fn().mockReturnThis(), // Simula res.status()
    json: jest.fn(), // Simula res.json()
  };

  db.query.mockResolvedValue({ rows: [{ id: 1, nome: "João", active: true }] });

  await getUsuarios(req, res);

  expect(res.status).toHaveBeenCalledWith(200); // O código deve ser 200
  expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: "João", active: true }]); // Retorno esperado
});
