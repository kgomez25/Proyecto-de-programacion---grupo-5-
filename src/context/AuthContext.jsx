import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const saveUsers = (users) => {
    localStorage.setItem("authUsers", JSON.stringify(users));
  };

  const loadUsers = () => {
    const saved = localStorage.getItem("authUsers");
    return saved ? JSON.parse(saved) : [];
  };

  const register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error("Todos los campos son obligatorios.");
    }
    const users = loadUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) throw new Error("Ya existe un usuario con este correo.");

    const newUser = { id: Date.now(), name, email, password };
    const nextUsers = [...users, newUser];
    saveUsers(nextUsers);
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setCurrentUser(newUser);
    return newUser;
  };

  const login = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Debes ingresar el correo y la contraseña.");
    }
    const users = loadUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Credenciales inválidas.");
    localStorage.setItem("authUser", JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setCurrentUser(null);
  };

  const value = { currentUser, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
