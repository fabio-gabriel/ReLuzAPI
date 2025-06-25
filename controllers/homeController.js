const Auction = require("../model/auction");
const Authentication = require("../services/authentication");
//const Authentication = require('../services/authentication')

class HomeController {
  async index(req, res) {
    const auction = Auction.where({ deleted: false });

    let data = {
      auctions: auction,
    };
    res.status(200);
    res.send(JSON.stringify(data));
  }

  async login(req, res) {
    const email = req.body["email"];
    const password = req.body["password"];
    const token = Authentication.login(email, password);

    if (token) {
      const data = {
        session_token: token,
      };

      res.status(200);
      res.send(JSON.stringify(data));
      return res.end();
    }
    res.status(401);
    return res.end();
  }

  async logout(req, res) {
    const session_token = req.cookies["session_token"];
    Authentication.logout(session_token);
    res.status(200);
    return res.end();
  }

  async validateTokenAuth(req, res) {
    const session_token = req.cookies["session_token"]
    const user = Authentication.validate_token(session_token)

    if(user){
      const data = {
        user: user
      }
      res.status(200)
      res.send(JSON.stringify(data))
      return res.end()
    }
    
    res.status(401)
    return res.end()
  }
}

module.exports = new HomeController();
