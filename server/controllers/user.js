import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from "../db/index.js";

function constructUserObject(userDAO) {
    return !userDAO ? null : {
      id: userDAO.id,
      username: userDAO.username,
      email: userDAO.email,
    };
  }

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await pool.query("SELECT * FROM t_user WHERE email = $1", [
        email
      ]);
  
      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User doesn't exists."});
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(404).json({ message: "Invalid credentials."});
      }

      const existingUser = constructUserObject(user.rows[0]);
      const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'testSecretToken', { expiresIn: "1h" });

      return res.status(200).json({ result: existingUser, token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Something went wrong."});
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
      const user = await pool.query("SELECT * FROM t_user WHERE email = $1", [
        email
      ]);
  
      if (user.rows.length > 0) {
        return res.status(404).json({ message: "User already exists."});
      }
  
      if (password !== confirmPassword) return res.status(404).json({ message: "Passwords don't match."});

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      
      let newUser = await pool.query(
        "INSERT INTO t_user (name, email, password) values ($1, $2, $3) RETURNING *",
        [`${firstName} ${lastName}`, email, bcryptPassword]);
  
      const existingUser = constructUserObject(newUser.rows[0]);

      const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'testSecretToken', { expiresIn: "1h" });
          
      res.status(200).json({ existingUser, token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Something went wrong."});
    }
}