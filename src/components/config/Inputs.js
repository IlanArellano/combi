import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

export default function Inputs() {
  const classes = useStyles();
  const [config, setConfig] = useState([]);

  const handleDevice = (e, d) => {
    setConfig((prevConf) => prevConf.splice(prevConf.length - 1, 1, {}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
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
                <option value={10}>Todos los dispositivos</option>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
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
                <option value={10}>Todos los dispositivos</option>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
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
