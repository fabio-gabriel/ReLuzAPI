const Policies = require("../policies/policies");

class ApplicationController {
  define_user_and_policy(res) {
    const logged_user = res.locals.user;
    const policy = new Policies(logged_user);

    return [logged_user, policy];
  }

  return_error(res) {
    switch (res.statusCode) {
      case 401:
        res.redirect("/administrative?error=Você não pode realizar essa ação");
        return res.end();
      case 403:
        res.redirect("/administrative?error=Acesso negado");
        return res.end();
      case 404:
        res.redirect("/administrative?error=Recurso não encontrado");
        return res.end();
      case 500:
        res.redirect("/administrative?error=Erro no servidor");
        return res.end();
      default:
        res.status(200);
        return res.end();
    }
  }
}

module.exports = ApplicationController;
