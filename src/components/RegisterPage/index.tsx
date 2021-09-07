import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { encrypt } from "../../utils/encryption";
import { UserDataContext } from "../../context/UserPassContext";

function RegisterPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { setPasswordHash } = useContext(UserDataContext);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  function register() {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setTimeout(() => {
        if (mounted) setError(null);
      }, 5000);
    } else {
      setError(null);
      const passwordHash = encrypt(localStorage.getItem("salt")!, password);
      localStorage.setItem("passwordHash", passwordHash);
      setPasswordHash(passwordHash);
    }
  }

  return (
    <div className="RegisterPage">
      <h1>Register</h1>
      <span>Enter password:</span>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className={error ? "visible" : ""}>{error}</span>
      <button aria-label="Register" type="submit" onClick={() => register()}>
        Register
      </button>
    </div>
  );
}

export default RegisterPage;
