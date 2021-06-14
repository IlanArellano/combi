import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Inputs from "./Inputs";

import { getGeofences } from "../../services/listOfGeofences";
import { deleteRecorridoById } from "../../services/recorridoService";

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
    color: "red",
    fontWeight: "bold",
  },
}));

export default function Config({ config, setConfig }) {
  const classes = useStyles();
  const [geofences, setGeofences] = useState([]);

  const handleAdd = () => {
    const newItem = {
      id: null,
      nombre: config[0].nombre,
      id_recorrido: config[0].id_recorrido,
      posicion: config.length + 1,
      id_geocerca_1: "",
      id_geocerca_2: "",
      minutos: "",
    };
    setConfig((prevConf) => prevConf.concat(newItem));
  };

  const handleEliminar = async () => {
    if (!config[config.length - 1].id) {
      setConfig((prevConf) => prevConf.splice(prevConf.length - 1, 1));
      return;
    }
    const DeleteId = await deleteRecorridoById({
      id: config[config.length - 1].id,
    });
    if (DeleteId.status === 200) {
      setConfig((prevConf) => prevConf.splice(prevConf.length - 1, 1));
    }
    console.log(DeleteId);
  };

  useEffect(() => {
    (async function () {
      setGeofences(await getGeofences());
    })();
  }, []);

  return (
    <div>
      {config && config.length > 0 && (
        <div className="Inputs">
          {config.map((recorrido, i) => {
            return (
              <Inputs key={i} geofences={geofences} recorrido={recorrido} />
            );
          })}
        </div>
      )}
      <div className="Add">
        <div>
          <Tooltip title="Agregar" arrow>
            <IconButton className={classes.root} onClick={handleAdd}>
              <Add className={classes.Icon} />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Eliminar última ruta" arrow>
            <IconButton className={classes.root} onClick={handleEliminar}>
              <DeleteIcon className={classes.IconDone} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
