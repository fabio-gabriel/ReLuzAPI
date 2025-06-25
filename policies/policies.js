const UserPolicies = require("./userPolicies");
const AuctionPolicies = require("./auctionPolicies");

class Policies {
  /**
   * @param logged_user
   */
  constructor(logged_user) {
    this.logged_user = logged_user;
  }

  user(resource = null) {
    return new UserPolicies(this.logged_user, resource);
  }

  auction(resource = null) {
    return new AuctionPolicies(this.logged_user, resource);
  }
}

module.exports = Policies;
