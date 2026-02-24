import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      localStorage.setItem("user", JSON.stringify(storedUser));
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
