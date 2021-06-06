import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Navbar from "../navbar";

export default function Logged({ children }) {
  const history = useHistory();
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    if (history.location.pathname === "/") {
      return <Redirect to="/home" />;
    }
    return (
      <>
        <Navbar />
        <div>{children}</div>
      </>
    );
  }
  return <Redirect to="/login" />;
}
