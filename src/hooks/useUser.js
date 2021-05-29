import { useContext, useCallback } from "react";
import { LoginService } from "../services/loginService";
import Context from "../context";

export default function useUser() {
  const { user, setUser } = useContext(Context);

  const getUser = () => {
    const userDecoded = window.atob(user);
    const data = userDecoded.split(":");
    return {
      user: data[0],
    };
  };

  const login = async ({ email, password }) => {
    const keys = { email, password };
    try {
      const res = await LoginService(keys);
      if (res.ok && res.status === 200) {
        const userEncode = window.btoa(`${email}:${password}`);
        window.localStorage.setItem("user", userEncode);
        setUser(userEncode);
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
  }, [setUser]);

  return {
    isLoggedIn: Boolean(user),
    login,
    logout,
    getUser,
  };
}
