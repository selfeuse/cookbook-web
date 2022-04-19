const PasswordManager = require("../services/PasswordManager");
const TokenGenerator = require("../facades/TokenGenerator");
const UserService = require("../services/User.service");

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = UserService.getUser(email);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists." });
    }

    const validPassword = PasswordManager.areTheSame(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const token = TokenGenerator.generateToken(user.email, user.userId);

    return res.status(200).json({ result: user, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const user = UserService.getUser(email);

    if (user) {
      return res.status(404).json({ message: "User already exists." });
    }

    const validPassword = PasswordManager.areTheSame(password, confirmPassword);

    if (!validPassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const userToAdd = {
      username: `${firstName} ${lastName}`,
      password: email,
      email: PasswordManager.encryptPassword(password),
    };

    const newUser = UserService.createUser(userToAdd);

    const token = TokenGenerator.generateToken(
      newUser.email,
      newUser.userId
    );

    return res.status(200).json({ newUser, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
