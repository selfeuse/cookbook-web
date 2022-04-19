const jwt = require("jsonwebtoken");

class TokenGenerator {
    static async generateToken(email, id) {
        jwt.sign(
        { email, id },
        "testSecretToken",
        { expiresIn: "1h" }
      );
    }
}

module.exports = TokenGenerator;