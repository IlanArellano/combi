import React, { useState } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";

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

export default function Inputs({ geofences }) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <h3>Punto 1 (Inicio)</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="Config">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor={`geocerca1`}>Geocerca</InputLabel>
              <Select
                native
                inputProps={{
                  name: `geocerca1`,
                  id: `geocerca1`,
                }}
              >
                <option aria-label="None" value="" />
                {geofences &&
                  !geofences.error &&
                  geofences.length > 0 &&
                  geofences.map((geofence) => {
                    return (
                      <option key={geofence.id} value={10}>
                        {geofence.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <span>a</span>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor={`geocerca2`}>Geocerca</InputLabel>
              <Select
                native
                defaultValue=""
                inputProps={{
                  name: `geocerca2`,
                  id: `geocerca2`,
                }}
              >
                <option aria-label="None" value="" />
                {geofences &&
                  geofences.length > 0 &&
                  geofences.map((geofence) => {
                    return (
                      <option key={geofence.id} value={10}>
                        {geofence.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <span>Tiempo</span>
            <TextField type="number" placeholder="Tiempo" />
            <span>Minutos</span>
          </div>
        </form>
      </CardContent>
      <CardActions>
        <div className="InputActions">
          <div>
            <Tooltip title="Guardar" arrow>
              <IconButton variant="outlined" color="primary">
                <AddIcon className={classes.IconInput} />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Eliminar" arrow>
              <IconButton variant="outlined" color="secondary">
                <DeleteIcon className={classes.IconInput} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
