import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/CheckOutlined";
import EditIcon from "@material-ui/icons/Create";
import SaveUpdateIcon from "@material-ui/icons/Brush";

import {
  addRecorridos,
  updateRecorridos,
} from "../../services/recorridoService";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  IconInput: {
    fontSize: "30px",
    fontWeight: "bold",
  },
}));

export default function Inputs({ geofences, recorrido = {} }) {
  const [options, setOptions] = useState(recorrido);
  const [item, setItem] = useState(false);
  const [editar, setEditar] = useState(false);
  const classes = useStyles();

  const handleAceptar = async (e) => {
    delete options.id;
    const add = await addRecorridos(options);
    console.log(add);
    setItem(false);
  };

  const handleEditar = () => {
    setEditar(true);
    setItem(true);
  };

  const handleSaveUpdate = async () => {
    delete options.nombre;
    const update = await updateRecorridos(options);
    console.log(update);
    setEditar(false);
    setItem(false);
  };

  useEffect(() => {
    if (!options.id_geocerca_1 && !options.id_geocerca_2 && !options.minutos) {
      setItem(true);
    } else {
      setItem(false);
    }
  }, [setItem]);

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <h3>{`Punto ${
          options.posicion === 1
            ? `${options.posicion} (Inicio)`
            : `${options.posicion}`
        }`}</h3>
        <form>
          <div className="Config">
            <FormControl
              className={classes.formControl}
              disabled={!Boolean(item)}
            >
              <InputLabel htmlFor={`geocerca${options.id}`}>
                Geocerca
              </InputLabel>
              <Select
                native
                inputProps={{
                  name: `geocerca${options.id}`,
                  id: `geocerca${options.id}`,
                }}
                value={options.id_geocerca_1.toString() || ""}
                onChange={(e) =>
                  setOptions((prevO) => {
                    return {
                      ...prevO,
                      id_geocerca_1: e.target.value,
                    };
                  })
                }
              >
                <option aria-label="None" value="" />
                {geofences &&
                  !geofences.error &&
                  geofences.length > 0 &&
                  geofences.map((geofence) => {
                    return (
                      <option key={geofence.id} value={geofence.id}>
                        {geofence.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <span>a</span>
            <FormControl
              className={classes.formControl}
              disabled={!Boolean(item)}
            >
              <InputLabel htmlFor={`geocerca${options.id}-2`}>
                Geocerca
              </InputLabel>
              <Select
                native
                inputProps={{
                  name: `geocerca${options.id}-2`,
                  id: `geocerca${options.id}-2`,
                }}
                value={options.id_geocerca_2.toString() || ""}
                onChange={(e) =>
                  setOptions((prevO) => {
                    return {
                      ...prevO,
                      id_geocerca_2: e.target.value,
                    };
                  })
                }
              >
                <option aria-label="None" value="" />
                {geofences &&
                  geofences.length > 0 &&
                  geofences.map((geofence) => {
                    return (
                      <option key={geofence.id} value={geofence.id}>
                        {geofence.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <span>Tiempo</span>
            <TextField
              type="number"
              min={0}
              placeholder="Tiempo"
              value={options.minutos || ""}
              onChange={(e) =>
                setOptions((prevO) => {
                  return {
                    ...prevO,
                    minutos: e.target.value,
                  };
                })
              }
              disabled={!Boolean(item)}
            />
            <span>Minutos</span>
          </div>
        </form>
      </CardContent>
      <CardActions>
        <div className="InputActions">
          <div>
            <Tooltip title="Editar" arrow>
              <IconButton
                variant="outlined"
                color="primary"
                disabled={Boolean(item)}
                onClick={handleEditar}
              >
                <EditIcon className={classes.IconInput} />
              </IconButton>
            </Tooltip>
          </div>
          {editar ? (
            <div>
              <Tooltip title="Guardar Modificación" arrow>
                <IconButton
                  variant="outlined"
                  color="primary"
                  disabled={
                    !Boolean(
                      options.id_geocerca_1 &&
                        options.id_geocerca_2 &&
                        options.minutos
                    )
                  }
                  onClick={handleSaveUpdate}
                >
                  <SaveUpdateIcon className={classes.IconInput} />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div>
              <Tooltip title="Guardar" arrow>
                <IconButton
                  variant="outlined"
                  color="primary"
                  disabled={
                    !Boolean(
                      options.id_geocerca_1 &&
                        options.id_geocerca_2 &&
                        options.minutos &&
                        item
                    )
                  }
                  onClick={handleAceptar}
                >
                  <AddIcon className={classes.IconInput} />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
