const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.users;

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: user.email, id: user.userId },
      "testSecretToken",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: user, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return res.status(404).json({ message: "User already exists." });
    }

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const userToAdd = {
      username: `${firstName} ${lastName}`,
      password: email,
      email: bcryptPassword,
    };

    User.create(userToAdd).then((newUser) => {
      const token = jwt.sign(
        { email: newUser.email, id: newUser.id },
        "testSecretToken",
        { expiresIn: "1h" }
      );

      return res.status(200).json({ newUser, token });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
