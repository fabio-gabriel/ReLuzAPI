class AuctionPolicies {
  /**
   * @param logged_user
   * @param book
   */

  constructor(logged_user, book) {
    this.logged_user = logged_user;
  }

  index() {
    switch (this.logged_user.role) {
      case "admin":
        return true;
      case "user":
        return false;
      default:
        return false;
    }
  }

  show() {
    switch (this.logged_user.role) {
      case "admin":
        return true;
      case "user":
        return false;
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
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }

  edit() {
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }

  update() {
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }

  delete() {
    if (this.logged_user.role === "admin") {
      return true;
    }
    return false;
  }
}

module.exports = AuctionPolicies;
