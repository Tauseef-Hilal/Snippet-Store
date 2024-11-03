import { useState } from "react";
import "./App.css";

function App() {
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
  }

  async function register() {
    const res = await fetch("http://127.0.0.1:5001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
      }),
    });

    const data = await res.json();
    setState({ ...state, msg: data.msg });
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="button"
        value={state.isLogin ? "Create an account" : "Already have an account?"}
        onClick={() => setState({ ...state, isLogin: !state.isLogin })}
      />
      <input type="submit" value={state.isLogin ? "Login" : "Register"} />
      <p>{state.msg}</p>
    </form>
  );
}

export default App;
