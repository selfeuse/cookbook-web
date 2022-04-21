const db = require("../db/db.init");

const User = db.users;

class UserService {
  static async getUser(email) {
    return await User.findOne({ where: { email } }).then(data => {
        if (data) return (data.toJSON());
      });
  }

  static async createUser(user) {
    return await User.create(user).then(data => {
        if (data) return (data.toJSON());
      });
  }
}

module.exports = UserService;
