import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Logo from "../../statics/svg/logo";
import useUser from "../../hooks/useUser";
import "./styles/index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      margin: "10px 0",
    },
  },
}));

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [error, setError] = useState({
    user: null,
    password: null,
    session: null,
  });
  const classes = useStyles();
  document.title = "Iniciar Sesion";

  const { login } = useUser();

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };

  const handleUser = (e) => {
    setUsername(e.target.value);
    if (username.length > 0) {
      setError((prevErr) => {
        return {
          ...prevErr,
          user: null,
        };
      });
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (password.length > 0) {
      setError((prevErr) => {
        return {
          ...prevErr,
          password: null,
        };
      });
    }
  };

  const userUnfocus = () => {
    if (username.length === 0) {
      setError((prevErr) => {
        return {
          ...prevErr,
          user: "Introduce un Nombre de usuario",
        };
      });
    }
  };

  const passwordUnfocus = () => {
    if (password.length === 0) {
      setError((prevErr) => {
        return {
          ...prevErr,
          password: "Introduce una contraseña",
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email: username, password, keep: check });
    if (res.error) {
      setError((prevErr) => {
        return {
          ...prevErr,
          session: "Usuario o contraseña no válidos",
        };
      });
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setError((prevErr) => {
          return {
            ...prevErr,
            session: null,
          };
        });
      }, 4000);
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div>
      <div className="Login">
        <form className={classes.root} onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center" }}>Inicio de sesión</h3>
          <div className="Logo">
            <Logo />
          </div>
          <span className="Error2">{error.session}</span>
          <FormControl>
            <InputLabel htmlFor="user">Nombre de usuario</InputLabel>
            <Input
              id="user"
              type="text"
              value={username}
              onChange={handleUser}
              onBlur={userUnfocus}
            />
            <span className="Error">{error.user}</span>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePassword}
              onBlur={passwordUnfocus}
            />
            <span className="Error">{error.password}</span>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={handleCheck}
                name="checkedB"
                color="primary"
              />
            }
            label="Mantener sesión iniciada"
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={!Boolean(username && password)}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
