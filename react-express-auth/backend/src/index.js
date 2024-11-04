import express from "express";
import cors from "cors";
import { loginUser, registerUser } from "./db.js";
import { verify } from "./jwt.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await registerUser(email, username, password);
    res.status(result.status).json({ msg: result.msg, token: result.token });
  } catch (err) {
    res.status(err.status).json({ msg: err.msg });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.status(result.status).json({ msg: result.msg, token: result.token });
  } catch (err) {
    res.status(err.status).json({ msg: err.msg });
  }
});

app.post("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = verify(token);
    res.status(202).json({ msg: "Access granted", user: decoded });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

app.listen(5001, () => console.log(`Server running on http://127.0.0.1:5001`));
