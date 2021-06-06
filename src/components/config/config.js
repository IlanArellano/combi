import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Inputs from "./Inputs";

import "./styles/index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ffffff",
  },
  Icon: {
    fontSize: "40px",
    color: "green",
    fontWeight: "bold",
  },
}));

export default function Config() {
  const classes = useStyles();
  const [config, setConfig] = useState([]);
  return (
    <div>
      {config.length !== 0 ? (
        <>
          <span>
            No hay ninguna ruta consfigurada, para agregar una nueva ruta
            selecciona el boton <Add />
          </span>
          <div className="Add">
            <div>
              <Tooltip title="Agregar" arrow>
                <IconButton className={classes.root}>
                  <Add className={classes.Icon} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      ) : (
        <div className="Inputs">
          <Inputs />
          <Inputs />
          <Inputs />
        </div>
      )}
    </div>
  );
}
