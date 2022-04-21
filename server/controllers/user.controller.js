const PasswordManager = require("../services/PasswordManager");
const TokenGenerator = require("../facades/TokenGenerator");
const UserService = require("../services/User.service");

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUser(email);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists." });
    }

    const validPassword = await PasswordManager.areTheSame(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const token = await TokenGenerator.generateToken(user.email, user.userId);

    return res.status(200).json({ result: user, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const user = await UserService.getUser(email);

    if (user) {
      return res.status(404).json({ message: "User already exists." });
    }

    const validPassword = (password === confirmPassword);

    if (!validPassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const userToAdd = {
      username: `${firstName} ${lastName}`,
      email: email,
      password: await PasswordManager.encryptPassword(password),
    };

    const newUser = await UserService.createUser(userToAdd);

    const token = TokenGenerator.generateToken(
      newUser.email,
      newUser.id
    );

    return res.status(200).json({ newUser, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
