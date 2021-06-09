import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Geocerca from "../../components/views/geocercas";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import moment from "moment";
import "./styles/index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [device, setDevice] = useState("");
  const [tipo, setTipo] = useState("");
  const [from, setFrom] = useState(moment().subtract(1, "hour"));
  const [to, setTo] = useState(moment());

  const handleDevice = (e) => {
    setDevice(e.target.value);
  };

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ device, tipo });
  };

  return (
    <div>
      <h3>Esta es la pagina de inicio</h3>
      <Card className={classes.root}>
        <CardContent>
          <div className="Filtro">
            <form onSubmit={handleSubmit} className="Devices">
              <div>
                <h4>Dispositivo (s)</h4>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="device">Dispositivo</InputLabel>
                  <Select
                    native
                    value={device}
                    onChange={handleDevice}
                    inputProps={{
                      name: "device",
                      id: "device",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Todos los dispositivos</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </Select>
                </FormControl>
                <div>
                  <TextField
                    margin="normal"
                    variant="filled"
                    label="Desde"
                    type="datetime-local"
                    value={from.format(moment.HTML5_FMT.DATETIME_LOCAL)}
                    onChange={(e) =>
                      setFrom(
                        moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL)
                      )
                    }
                    fullWidth
                  />
                  <TextField
                    margin="normal"
                    variant="filled"
                    label="Hasta"
                    type="datetime-local"
                    value={to.format(moment.HTML5_FMT.DATETIME_LOCAL)}
                    onChange={(e) =>
                      setTo(
                        moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL)
                      )
                    }
                    fullWidth
                  />
                </div>
              </div>
            </form>
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit" color="primary" variant="contained">
            Aceptar
          </Button>
        </CardActions>
      </Card>
      <div className="Tabla">
        <Geocerca rows={[]} loading={false} />
      </div>
    </div>
  );
}
