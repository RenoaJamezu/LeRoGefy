import bcrypt from 'bcrypt';
import { dbConnection } from "../database/database.js";
import dotenv from "dotenv";
dotenv.config();

// login endpoint
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the email exists
    const user = await dbConnection.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const user_info = user.rows[0];
    console.log(user_info);

    const hashed_password = user.rows[0].hashed_password;
    const isValidPassword = await bcrypt.compare(password, hashed_password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // return success
    return res.status(200).json({
      user_info,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// signup endpoint
export const signup = async(req, res) => {

  try {
    const {username, email, password} = req.body;

    // Check if the email already exists
    const existingEmail = await dbConnection.query(
			"SELECT * FROM users WHERE email = $1",
			[email],
		);

		if (existingEmail.rows.length > 0) {
			return res.status(400).json({ message: "User already exists!" });
		}

    // Insert a new user into the database using parameterized query
    const newUserQuery = `INSERT INTO users (username, email, hashed_password)
    VALUES ($1, $2, $3)`;

    const hashed_password = await bcrypt.hash (password, 10);
    await dbConnection.query(newUserQuery, [
      username,
      email,
      hashed_password,
    ]);

    res.status(201).json({ newUserQuery, message: "New user created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



