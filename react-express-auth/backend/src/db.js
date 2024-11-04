import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import { sign } from "./jwt.js";

const db = new sqlite3.Database("../database.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to the SQLite database.");
});

db.run(`
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(30) UNIQUE NOT NULL,
    username VARCHAR(30) NOT NULL,
    password TEXT NOT NULL
  )
`);

export async function registerUser(email, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO User (email, username, password) VALUES (?, ?, ?)`,
      [email, username, hashedPassword],
      (err) => {
        if (err) {
          console.error(err);
          reject({
            status: 500,
            msg: "User already exists or error occurred",
          });
        } else {
          const token = sign(
            { email: email, username: username },
            "your_jwt_secret"
          );
          resolve({ status: 201, msg: "User registered successfully", token });
        }
      }
    );
  });
}

export function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM User WHERE email = ?`, [email], async (err, user) => {
      if (err || !user) {
        console.error(err);
        return reject({ status: 400, msg: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return reject({ status: 400, msg: "Invalid password" });

      const token = sign({ email: user.email, username: user.username });
      resolve({ status: 202, msg: "Logged in successfully", token });
    });
  });
}
