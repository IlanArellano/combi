import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Geocerca from "../../components/views/geocercas";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";

import { getRutas } from "../../services/rutasService";
import getDevices from "../../services/deviceService";
import { getDevices as getDevicesSelect } from "../../services/deviceAPIservice";
import { getRecorridos } from "../../services/recorridoService";
import { getGeofences } from "../../services/listOfGeofences";
import geofenceEvent, { selectDate } from "../../services/geofenceService";

import { getTableContent } from "../../utils/getTableContent";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [ruta, setRuta] = useState([]);
  const [recorrido, setRecorrido] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [infoTable, setInfoTable] = useState([]);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [devicesDisplay, setDevicesDisplay] = useState([]);
  const [deviceSelect, setDeviceSelect] = useState("");
  const [fecha, setFecha] = useState("Hoy");

  const handleDevice = (e) => {
    setDeviceSelect(e.target.value);
  };

  const handleFecha = (e) => {
    setFecha(e.target.value);
  };

  const handleSubmit = async () => {
    const getFechaInterval = selectDate({ fecha });

    const getGeofenceEvent = await geofenceEvent({
      deviceId: deviceSelect,
      from: getFechaInterval.from.toISOString(),
      to: getFechaInterval.to.toISOString(),
    });

    try {
      console.log(
        await getTableContent({
          ruta,
          recorrido,
          devices,
          geofences,
          Event: getGeofenceEvent,
          getFechaInterval,
        })
      );
      setInfoTable(
        await getTableContent({
          ruta,
          recorrido,
          devices,
          geofences,
          Event: getGeofenceEvent,
          getFechaInterval,
        })
      );
    } catch (error) {
      setError(`Ha ocurrido un error: ${error}`);
    }
  };

  useEffect(() => {
    (async function () {
      const Rutas = await getRutas();
      const Recorridos = await getRecorridos();
      const Geocercas = await getGeofences();
      setRuta(Rutas);
      setRecorrido(Recorridos.response);
      setGeofences(Geocercas);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const Devices = await getDevices();
      const DisplayDevices = await getDevicesSelect();
      const devicesFilter =
        DisplayDevices && DisplayDevices.length > 0
          ? DisplayDevices.map((D) => {
              return Devices.find((device) => device.id === D.id_device);
            })
          : [];
      setDevicesDisplay(devicesFilter);
      setDevices(Devices);
    })();
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Esta es la pagina de inicio</h3>
      <Card className={classes.root}>
        <CardContent>
          <div className="Filtro">
            <form className="Devices">
              <div>
                <h4>Dispositivo (s)</h4>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="device">Dispositivo</InputLabel>
                  <Select
                    native
                    value={deviceSelect}
                    onChange={handleDevice}
                    inputProps={{
                      name: "device",
                      id: "device",
                    }}
                  >
                    <option aria-label="None" value="" />
                    {devicesDisplay &&
                      devicesDisplay.length > 0 &&
                      devicesDisplay.map((device) => {
                        return (
                          <option key={device.id} value={device.id}>
                            {device.name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
                <div>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="Periodo" color="secondary">
                      Periodo
                    </InputLabel>
                    <Select
                      labelId="Periodo"
                      id="Periodo"
                      value={fecha}
                      onChange={handleFecha}
                      label="Periodo"
                    >
                      <MenuItem value="Hoy">Hoy</MenuItem>
                      <MenuItem value="Ayer">Ayer</MenuItem>
                      <MenuItem value="SemanaActual">Semana Actual</MenuItem>
                      <MenuItem value="SemanaAnterior">
                        Semana Anterior
                      </MenuItem>
                      <MenuItem value="MesActual">Mes Actual</MenuItem>
                      <MenuItem value="MesAnterior">Mes Anterior</MenuItem>
                      <MenuItem value="Personalizado">Personalizado</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={!Boolean(deviceSelect)}
          >
            Aceptar
          </Button>
        </CardActions>
      </Card>
      <div className="Tabla">
        <Geocerca tableInfo={infoTable} error={error} />
      </div>
    </div>
  );
}
