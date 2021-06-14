import { useState, createContext, useEffect } from "react";
import moment from "moment";

const Context = createContext();

export function UserContext({ children }) {
  const [user, setUser] = useState(() => window.localStorage.getItem("user"));
  const [fecha, setFecha] = useState(() =>
    window.localStorage.getItem("fecha")
  );

  useEffect(() => {
    if (
      user &&
      fecha &&
      moment(fecha, "MMMM Do YYYY, h:mm:ss a").fromNow() === "a day ago"
    ) {
      window.localStorage.removeItem("fecha");
      window.localStorage.removeItem("user");
      setFecha(null);
      setUser(null);
      window.location.href = "/login";
    }
  }, [user, fecha]);

  return (
    <Context.Provider value={{ user, setUser, fecha, setFecha }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
