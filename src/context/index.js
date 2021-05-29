import { useState, createContext, useEffect } from "react";

const Context = createContext();

export function UserContext({ children }) {
  const [user, setUser] = useState(() => window.localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

export default Context;
