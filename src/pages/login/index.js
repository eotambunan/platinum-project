// login.js

import { loginApi, registerApi } from "@/rest_API/users_api";
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginMode, setLoginMode] = useState(true); // Added state for mode
  const router = useRouter();

  const handleClick = async () => {
    try {
      const payload = { email, password };

      if (isLoginMode) {
        const response = await loginApi(payload);
        setCookie("user-access", JSON.stringify(response.data), {
          expires: 1,
        });
      } else {
        await registerApi(payload);
      }

      router.push("/").then(() => router.reload());
    } catch (error) {
      console.error("Login or register error:", error);
      setError("Invalid email or password");
    }
  };

  const toggleMode = () => {
    setLoginMode((prevMode) => !prevMode);
    setError(""); // Clear error on mode switch
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 style={{ color: "white" }}>{isLoginMode ? "Login" : "Register"}</h2>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <p className={styles.errorMsg}>{error}</p>}
        <button className={styles.submitButton} onClick={handleClick}>
          {isLoginMode ? "Login" : "Register"}
        </button>
        <p style={{ color: "white", margin: "10px 0" }}>
          {isLoginMode ? "Not a user? " : "Already a user? "}
          <button className={styles.switchButton} onClick={toggleMode}>
            {isLoginMode ? "Register now" : "Login now"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
