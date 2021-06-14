import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import DispositivoTable from "../../components/views/dispositivosConfig";
import getDevicesTraccar from "../../services/deviceService";

import { getRecorridos } from "../../services/recorridoService";
import { getGeofences } from "../../services/listOfGeofences";
import { getDevices, addDevices } from "../../services/deviceAPIservice";

import "./styles/index.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function Dispositivos() {
  const [load, setLoad] = useState(false);
  const [recorrido, setRecorrido] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [nombresR, setNombresR] = useState([]);
  const [campos, setCampos] = useState({
    id_device: "",
    id_recorrido: "",
    hora: moment(),
  });
  const [destino, setDestino] = useState("");
  const [devices, setDevices] = useState([]);
  const [devicesTabla, setDevicesTabla] = useState([]);
  const classes = useStyles();

  const handleChangeRecorrido = (e) => {
    const Item = recorrido
      .filter((rec) => rec.nombre === e.target.value)
      .sort((a, b) => a.posicion - b.posicion);
    const displayNombre = geofences.find(
      (device) => device.id === Item[Item.length - 1].id_geocerca_2
    );
    if (typeof displayNombre !== "object") {
      throw new Error("No se encontro");
    }
    setDestino(displayNombre.name);
    setCampos((campo) => {
      return {
        ...campo,
        id_recorrido: e.target.value,
      };
    });
  };

  const handleAceptar = async () => {
    console.log({ ...campos, hora: campos.hora.format("LTS").split(" ")[0] });
    const addD = await addDevices({
      ...campos,
      hora: campos.hora.format("LTS").split(" ")[0],
      id_recorrido: recorrido.filter((r) => r.nombre === campos.id_recorrido)[0]
        .id_recorrido,
    });
    console.log(addD);
  };

  useEffect(() => {
    (async function () {
      let Devices = await getDevicesTraccar();
      if (Array.isArray(Devices)) {
        setDevices(
          Devices.sort((a, b) => {
            return a.name - b.name;
          })
        );
      }
      const Geofences = await getGeofences();
      if (Array.isArray(Geofences)) {
        setGeofences(Geofences);
      }
      const Recorridos = await getRecorridos();
      setRecorrido(Recorridos.response);
      setNombresR(Recorridos.nombres);
      const DevicesAPI = await getDevices();
      if (Array.isArray(DevicesAPI)) {
        setDevicesTabla(DevicesAPI);
      }
      setLoad(true);
    })();
  }, [setLoad]);

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
            value={campos.id_device}
            onChange={(e) =>
              setCampos((campo) => {
                return {
                  ...campo,
                  id_device: e.target.value,
                };
              })
            }
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
            value={campos.id_recorrido}
            onChange={handleChangeRecorrido}
          >
            <option aria-label="None" value="" />
            {nombresR &&
              nombresR.length > 0 &&
              nombresR.map((nombre, i) => {
                return (
                  <option key={i} value={nombre}>
                    {nombre}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <TextField
          type="text"
          placeholder="Destino"
          disabled
          value={destino || ""}
        />
        <TextField
          margin="normal"
          variant="filled"
          label="Fecha y hora de ingreso"
          type="time"
          value={campos.hora.format(moment.HTML5_FMT.TIME)}
          onChange={(e) =>
            setCampos((campo) => {
              return {
                ...campo,
                hora: moment(e.target.value, moment.HTML5_FMT.TIME),
              };
            })
          }
        />
        <div>
          <Button variant="outlined" onClick={handleAceptar}>
            Aceptar
          </Button>
          <Button variant="outlined">Limpiar</Button>
        </div>
      </div>
      <div>
        {!load ? (
          <LinearProgress />
        ) : (
          <DispositivoTable
            rows={devicesTabla}
            devices={devices}
            recorrido={recorrido}
            geofences={geofences}
          />
        )}
      </div>
    </div>
  );
}
