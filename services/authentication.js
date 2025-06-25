const User = require("../model/user");
const DataAccessor = require("./data_accessor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class Authenticate {
  static login(email, password) {
    const user = User.where({ email: email })[0];

    if (!user) { 
      return false;
    }
    

    const hashDecrypt = bcrypt.compare(password, user.password);

    if (user && hashDecrypt) {
      const token = generate_jwt(user);
      return token;
    }

    return false;
  }

  static validate_token(user_session_token) {
    const db = new DataAccessor("sessionTokens");

    const register = db.where(
      "session_token",
      user_session_token.toString()
    )[0];

    try {
      var decoded = jwt.verify(register.session_token, "shhhhh");
      const user = User.find(decoded.sub);

      return user;
    } catch (error) {
      return false;
    }
  }

  static logout(user_session_token) {
    const db = new DataAccessor("sessionTokens");
    const register = db.where("session_token", user_session_token)[0];
    db.delete_session(register.id);

    const valid = Authenticate.validate_token(user_session_token);

    return !valid;
  }
}

function generate_jwt(user) {
  const db = new DataAccessor("sessionTokens");
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const jwtToken = jwt.sign(payload, "shhhhh", { expiresIn: "1h" });

  db.create({ session_token: jwtToken });
  return jwtToken;
}

module.exports = Authenticate;
