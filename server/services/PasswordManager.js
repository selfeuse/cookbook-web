const bcrypt = require("bcryptjs");

class PasswordManager {
    static async areTheSame(password1, password2) {
        return await bcrypt.compare(password1, password2);
    }
    
    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        
        return await bcrypt.hash(password, salt);
    }
}

module.exports = PasswordManager;