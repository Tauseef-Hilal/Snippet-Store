import { useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Login.css";

function Login() {
  const { isLoggedIn, login: saveToken } = useAuth();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    msg: "",
    isLogin: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    state.isLogin ? login() : register();
  }

  async function login() {
    const res = await fetch("http://127.0.0.1:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });

    const data = await res.json();
    setState({ ...state, msg: data.msg });

    if (data.token) {
      saveToken(data.token);
    }
  }

  async function register() {
    const res = await fetch("http://127.0.0.1:5001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: state.name,
        email: state.email,
        password: state.password,
      }),
    });

    const data = await res.json();
    saveToken(data.token);

    if (data.token) {
      saveToken(data.token);
    }
  }

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{state.isLogin ? "Login to your account" : "Create an account"}</h1>
      {!state.isLogin && (
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      )}
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setState({ ...state, email: e.target.value })}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <input type="submit" value={state.isLogin ? "Login" : "Register"} />
      <p id="question">
        {state.isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setState({ ...state, isLogin: !state.isLogin })}>
          {state.isLogin ? "Sign up now" : "Sign in now"}
        </span>
      </p>
      <p id="message">{state.msg}</p>
    </form>
  );
}

export default Login;
