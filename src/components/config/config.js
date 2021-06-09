import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
import Inputs from "./Inputs";

import { getGeofences } from "../../services/listOfGeofences";

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
  IconDone: {
    fontSize: "40px",
    color: "blue",
    fontWeight: "bold",
  },
}));

export default function Config() {
  const classes = useStyles();
  const [config, setConfig] = useState([]);
  const [geofences, setGeofences] = useState([]);

  useEffect(() => {
    (async function () {
      setGeofences(await getGeofences());
    })();
  }, []);

  return (
    <div>
      {config.length !== 0 ? (
        <>
          <span>
            No hay ninguna ruta consfigurada, para agregar una nueva ruta
            selecciona el boton <Add />
          </span>
        </>
      ) : (
        <div className="Inputs">
          <Inputs geofences={geofences} />
        </div>
      )}
      <div className="Add">
        <div>
          <Tooltip title="Agregar" arrow>
            <IconButton className={classes.root}>
              <Add className={classes.Icon} />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Guardar Cambios" arrow>
            <IconButton className={classes.root}>
              <DoneIcon className={classes.IconDone} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
