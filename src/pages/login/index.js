import { postLogin } from "@/rest_API/users_api";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await postLogin(email, password);
      console.log("Login successful. Token:", token);
      // Store the token in a global context or state if needed
      router.push("/wallet");
    } catch (error) {
      setError("Invalid email or password. Please try again."); // Display a meaningful error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;