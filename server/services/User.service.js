const db = require("../db/db.init");

const User = db.users;

class UserService {
  static async get(email) {
    return await User.findOne({ where: { email } }).then((data) => {
      return data?.toJSON();
    });
  }

  static async create(user) {
    return await User.create(user).then((data) => {
      return data?.toJSON();
    });
  }
}

module.exports = UserService;
