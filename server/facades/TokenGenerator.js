const jwt = require("jsonwebtoken");

class TokenGenerator {
    static generateToken(email, id) {
        return jwt.sign(
        { email, id },
        "testSecretToken",
        { expiresIn: "1h" }
      );
    }
}

module.exports = TokenGenerator;