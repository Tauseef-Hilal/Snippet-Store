import jwt from "jsonwebtoken";

const SECRET_KEY = "jwt-secret";

export function verify(token) {
  return jwt.verify(token, SECRET_KEY);
}

export function sign(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}
