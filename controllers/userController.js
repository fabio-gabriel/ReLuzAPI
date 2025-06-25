const ApplicationController = require("./applicationController");
const User = require("../model/user");

class UserController extends ApplicationController {
  async usersJson(req, res) {
    let type = req.body.params.type;
    let users = [];

    switch (type) {
      case "nome":
        users = User.where({ name: req.body.params.search, deleted: "false" });
        break;
      case "email":
        users = User.where({ email: req.body.params.search, deleted: "false" });
        break;
      default:
        users = User.where({ deleted: "false" });
        break;
    }

    let users_jsons = users.map((user) => {
      return user.json();
    });

    let data = {
      users_jsons: users_jsons,
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    return res.send(JSON.stringify(data));
  }

  async index(req, res) {
    const error = req.query.error;
    const [current_user, policy] = super.define_user_and_policy(res);
    let users = User.where({ deleted: "false" });

    if (!policy.user().index()) {
      res.status(401);
      return res.end();
    }

    const data = {
      users: users,
    };
    res.status(200);
    return res.send(JSON.stringify(data));
  }

  async show(req, res) {
    const error = req.query.error;
    const [current_user, policy] = super.define_user_and_policy(res);
    let user = User.find(req.params.id);

    if (!policy.user(user).show()) {
      res.status(401);
      return res.end();
    }

    const data = {
      user: user,
    };
    res.status(200);
    return res.send(JSON.stringify(data));
  }

  async new(req, res) {
    const error = req.query.error;
    const [current_user, policy] = super.define_user_and_policy(res);

    if (!policy.user().new()) {
      res.status(401);
      return res.end();
    }

    res.status(200);
    return res.end();
  }

  async create(req, res) {
    const error = req.query.error;
    const [current_user, policy] = super.define_user_and_policy(res);

    if (!policy.user().create()) {
      res.status(401);
      return res.end();
    }

    let params = req.body;

    let user = User.create({
      name: params.name,
      username: params.username,
      cpf: params.cpf,
      email: params.email,
      password: params.password,
      role: params.role,
    });

    const data = {
      user: user,
    };

    res.status(201);
    return res.send(JSON.stringify(data));
  }

  async edit(req, res) {
    const error = req.query.error;
    const [current_user, policy] = super.define_user_and_policy(res);

    if (!policy.user().edit()) {
      res.status(401);
      return res.end();
    }

    let user = User.find(req.params.id);

    const data = {
      user: user,
    };
    res.status(200);
    return res.send(JSON.stringify(data));
  }

  async update(req, res) {
    const error = req.query.error;
    const [current_user, policy] = super.define_user_and_policy(res);

    if (!policy.user().update()) {
      res.status(401);
      return res.end();
    }

    let params = req.body;
    let user = User.find(req.params.id);

    user.update({
      name: params.name,
      cpf: params.cpf,
      username: params.username,
      email: params.email,
      password: params.password,
      role: params.role,
    });

    const data = {
      user: user,
    };

    res.status(200);
    return res.send(JSON.stringify(data));
  }

  async delete(req, res) {
    const id = req.params.id;
    User.delete(id);

    res.status(204);
    return res.end();
  }
}

module.exports = new UserController();
