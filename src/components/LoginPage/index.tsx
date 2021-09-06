import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../context/UserPassContext";
import { decrypt } from "../../utils/encryption";
import "./index.css";

function LoginPage() {
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(UserDataContext);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  function login() {
    const passwordValid =
      decrypt(
        localStorage.getItem("salt")!,
        localStorage.getItem("passwordHash")!
      ) === password;
    if (!passwordValid) {
      localStorage.removeItem("loggedInTimestamp");
      setError("Invalid password!");
      setTimeout(() => {
        if (mounted) setError(null);
      }, 5000);
    } else {
      setError(null);
      localStorage.setItem("loggedInTimestamp", Date.now().toString());
      setLoggedIn(true);
    }
  }

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className={error ? "visible" : ""}>{error}</span>
      <button type="submit" onClick={() => login()}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
