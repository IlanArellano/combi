import { useContext, useCallback } from "react";
import { LoginService } from "../services/loginService";
import Context from "../context";
import moment from "moment";

export default function useUser() {
  const { user, setUser, setFecha } = useContext(Context);

  const getUserToken = () => user;

  const getUser = () => {
    const userDecoded = window.atob(user);
    const data = userDecoded.split(":");
    return {
      user: data[0],
    };
  };

  const login = async ({ email, password, keep = false }) => {
    const keys = { email, password };
    try {
      const res = await LoginService(keys);
      if (res.ok && res.status === 200) {
        const userEncode = window.btoa(`${email}:${password}`);
        window.localStorage.setItem("user", userEncode);
        setUser(userEncode);
        if (!keep) {
          window.localStorage.setItem(
            "fecha",
            moment().format("MMMM Do YYYY, h:mm:ss a")
          );
          setFecha(window.localStorage.getItem("fecha"));
        } else {
          window.localStorage.removeItem("fecha");
          setFecha(null);
        }
        return {
          success: true,
        };
      } else {
        window.localStorage.removeItem("user");
        return {
          error: `Ha ocurrido un error`,
        };
      }
    } catch (error) {
      window.localStorage.removeItem("user");
      return {
        error: `Ha ocurrido un error: ${error}`,
      };
    }
  };

  const logout = useCallback(() => {
    window.localStorage.removeItem("user");
    setUser(null);
    window.localStorage.removeItem("fecha");
    setFecha(null);
  }, [setUser, setFecha]);

  return {
    isLoggedIn: Boolean(user),
    login,
    logout,
    getUser,
    getUserToken,
  };
}
