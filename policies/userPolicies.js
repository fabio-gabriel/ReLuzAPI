const { index } = require("../controllers/homeController");

class UserPolicies {
  /**
   * @param logged_user
   * @param user
   */

  constructor(logged_user, user) {
    this.logged_user = logged_user;
    this.user = user;
  }

  index() {
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }

  show() {
    switch (this.logged_user.role) {
      case "admin":
        return true;
      case "user":
        return this.logged_user.id === this.user.id;
      default:
        return false;
    }
  }

  new() {
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }

  create() {
    return true;
  }

  edit() {
    switch (this.logged_user.role) {
      case "admin":
        return true;
      case "user":
        return true;
      default:
        return false;
    }
  }

  update() {
    switch (this.logged_user.role) {
      case "admin":
        return true;
      case "user":
        return true;
      default:
        return false;
    }
  }

  delete() {
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }

  self_delete() {
    switch (this.logged_user.role) {
      case "admin":
        return true;
      case "user":
        return true;
      default:
        return false;
    }
  }
}

module.exports = UserPolicies;
