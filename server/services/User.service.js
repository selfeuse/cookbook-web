const db = require("../db/db.init");

const User = db.users;

class UserService {
    static async getUser(email) {
        return await User.findOne({ where: { email } });
    }

    static createUser(user) {
        return User.create(user);
    }
}

module.exports = UserService;