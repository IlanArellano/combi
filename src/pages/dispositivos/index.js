import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import moment from "moment";
import DispositivoTable from "../../components/views/dispositivosConfig";
import getDevices from "../../services/deviceService";
import "./styles/index.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function Dispositivos() {
  const [devices, setDevices] = useState([]);
  const [fecha, setFecha] = useState(moment());
  const classes = useStyles();

  useEffect(() => {
    (async function () {
      let Devices = await getDevices();
      if (Array.isArray(Devices)) {
        setDevices(
          Devices.sort((a, b) => {
            return a.name - b.name;
          })
        );
      }
    })();
  }, []);
  return (
    <div>
      <h3>Configuración de los dispositivos</h3>
      <div className="DispositivoInput">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="dispositivo">Dispositivo</InputLabel>
          <Select
            native
            defaultValue=""
            inputProps={{
              name: "dispositivo",
              id: "dispositivo",
            }}
          >
            <option aria-label="None" value="" />
            {devices &&
              devices.length &&
              !devices.error &&
              devices.map((device) => {
                return (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="recorrido">Recorrido</InputLabel>
          <Select
            native
            defaultValue=""
            inputProps={{
              name: "recorrido",
              id: "recorrido",
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Hola</option>
            <option value={10}>Hola</option>
            <option value={10}>Hola</option>
          </Select>
        </FormControl>
        <TextField type="text" placeholder="Destino" disabled />
        <TextField
          margin="normal"
          variant="filled"
          label="Fecha y hora de ingreso"
          type="datetime-local"
          value={fecha.format(moment.HTML5_FMT.DATETIME_LOCAL)}
          onChange={(e) =>
            setFecha(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))
          }
        />
        <div>
          <Button variant="outlined">Aceptar</Button>
          <Button variant="outlined">Cancelar</Button>
        </div>
      </div>
      <div>
        <DispositivoTable />
      </div>
    </div>
  );
}
