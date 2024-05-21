import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Login.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setSuccesMsg(
          "Logged in successfully,You will now be automatically redirected to Home Page."
        );
        setTimeout(() => {
          setSuccesMsg("");
          navigate("/home");
        }, 3000);
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log(error.mesage);
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please fill all required fields!");
        }
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setErrorMsg("Email not found");
        }
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMsg("Wrong Password");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form className="login-form">
          <p>Login</p>
          <div></div>
          {succesMsg && (
            <>
              <div className="succes-msg">{succesMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}

          <label>Your Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Please enter Your Email Address"
          />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Please enter Your Password"
          />

          <button onClick={handleLogin}>Login</button>
          <div>
            <span>Don't have an account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
