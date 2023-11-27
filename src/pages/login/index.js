import { useState } from "react";
import { loginApi } from "@/rest_API/users_api";
import styles from "./login.module.css"; // Make sure the file path is correct
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Use this state to switch between login and registration forms

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const payload = { email, password };
      const response = await loginApi(payload);

      // Assuming the API response contains the user data
      const userData = response.data;

      // Set user-access cookie
      setCookie("user-access", JSON.stringify(userData), {
        expires: 1,
      });

      // Redirect to the home page
      router.push("/").then(() => router.reload());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const switchForm = () => {
    // Toggle between login and registration forms
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className={styles.switchButton} onClick={switchForm}>
          {isLogin ? "Not a user? Register now" : "Already a user? Login now"}
        </p>
      </div>
    </div>
  );
};

export default Login;
