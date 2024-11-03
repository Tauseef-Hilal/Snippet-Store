import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = {
  "root@gmail.com": {
    name: "Root User",
    email: "root@gmail.com",
    password: "12345678",
  },
};

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  users[email] = { name, email, password };

  res.status(200).json({ msg: "User created successfully!" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!users[email]) {
    res.status(404).json({ msg: "User does not exist" });
    return;
  }

  const user = users[email];
  if (user.password != password) {
    res.status(401).json({ msg: "Invalid password" });
    return;
  }

  res.status(200).json({ msg: "Login successfull" });
});

app.get("/", (_, res) => res.send("Hello world"));

app.listen(5001, () => console.log(`Server running on http://127.0.0.1:5001`));
