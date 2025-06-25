const URL = require("url");
const data = require("../data/universidades.json");

function handleGET(req, res) {
  const { id, name, username, role, cpf, email, password, deleted } = URL.parse(
    req.url,
    true,
  ).query;
  const recurso = URL.parse(req.url, false).pathname;

  switch (recurso) {
    case "/list":
      return res.end(JSON.stringify(data)); // envia os dados no formato JSON

    default:
      res.statusCode = "404";
      return res.end();
  }
}
module.exports = handleGET;
