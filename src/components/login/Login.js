import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handelBlur = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handelSignIn = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("Wrong Credentials, User Not Found...!");
        }
        if (error.code === "auth/wrong-password") {
          setError("Wrong Email or Password !");
        }
        console.log(error.code);
      });
    e.preventDefault();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  });

  return (
    <div className="App">
      <h1>React firebase Authentication : Login to Your Account</h1>

      <form action="submit">
        <input
          onBlur={handelBlur}
          required
          type="email"
          name="email"
          placeholder="Type your email..."
        />
        <br />
        <input
          onBlur={handelBlur}
          required
          type="password"
          name="password"
          placeholder="Password..."
        />
        <br />
        <button onClick={handelSignIn} className="btn" type="submit">
          Sign In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Don't have an account. <Link to="/signUp">Sign Up</Link>{" "}
      </p>
    </div>
  );
}

export default Login;
