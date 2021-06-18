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
import {
  getDevices,
  addDevices,
  updateDevices,
  getDevicesById,
} from "../../services/deviceAPIservice";
import { getRutaById, addOrUpdateRuta } from "../../services/rutasService";

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
  const [editar, setEditar] = useState(false);
  const [temporalId, setTemporalId] = useState("");
  const classes = useStyles();

  const handleChangeRecorrido = (e) => {
    setCampos((campo) => {
      return {
        ...campo,
        id_recorrido: e.target.value,
      };
    });
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
  };

  const camposRuta = async (id) => {
    const lugarFilter = recorrido
      .filter((rec) => rec.nombre === campos.id_recorrido)
      .sort((a, b) => a.posicion - b.posicion);
    const addRutas = await addOrUpdateRuta({
      id,
      idlugaro: lugarFilter[0].id_geocerca_1,
      idlugard: lugarFilter[lugarFilter.length - 1].id_geocerca_2,
      fechaI: campos.hora.format("LTS"),
      id_recorrido: recorrido.filter((r) => r.nombre === campos.id_recorrido)[0]
        .id_recorrido,
      iddevice: campos.id_device,
    });
    return addRutas;
  };

  const handleAceptar = async () => {
    const newCampos = {
      ...campos,
      id: campos.id_device,
      hora: campos.hora.format("LTS"),
      id_recorrido: recorrido.filter((r) => r.nombre === campos.id_recorrido)[0]
        .id_recorrido,
    };
    setDevicesTabla((prevD) => prevD.concat(newCampos));
    delete newCampos.id;
    const addD = await addDevices(newCampos);
    console.log(addD);
    console.log(await camposRuta(null));
  };

  const handleEditar = async (id) => {
    setEditar(true);
    const GetDevice = await getDevicesById({ id });
    console.log(GetDevice);
    setCampos({
      id_device: GetDevice[0].id_device,
      id_recorrido: GetDevice[0].id_recorrido,
      hora: moment(GetDevice[0].hora, "hh:mm:ss"),
    });
    setTemporalId(id);
  };

  const handleEditarSubmit = async () => {
    const camposUpdate = {
      ...campos,
      hora: campos.hora.format("LTS"),
      id: temporalId,
      id_recorrido: recorrido.filter((r) => r.nombre === campos.id_recorrido)[0]
        .id_recorrido,
    };
    const UpdateDevie = await updateDevices(camposUpdate);
    console.log(UpdateDevie);
    const checkRuta = await getRutaById({ id: campos.id_device });
    if (checkRuta.length > 0) {
      console.log(await camposRuta(checkRuta[0].id_ruta));
    }
    setEditar(false);
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
        <div className="DeviceButtons">
          {!editar ? (
            <Button
              variant="outlined"
              onClick={handleAceptar}
              disabled={!Boolean(campos.id_device && campos.id_recorrido)}
            >
              Aceptar
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleEditarSubmit}
              disabled={!Boolean(campos.id_device && campos.id_recorrido)}
            >
              Editar
            </Button>
          )}
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
            handleEditar={handleEditar}
          />
        )}
      </div>
    </div>
  );
}
