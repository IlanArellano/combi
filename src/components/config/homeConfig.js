import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
/*import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";*/
import moment from "moment";

import {
  getRutas,
  getRutaById,
  addOrUpdateRuta,
} from "../../services/rutasService";
import getDevices from "../../services/deviceService";
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

export default function Home({ setInfoTable, setError, setLoad }) {
  const classes = useStyles();
  // const [rutasToF, setRutasToF] = useState([]);
  const [recorrido, setRecorrido] = useState([]);
  //const [deviceRuta, setDeviceRuta] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [devices, setDevices] = useState([]);
  const [destino, setDestino] = useState("");
  const [nombresR, setNombresR] = useState([]);
  const [fecha, setFecha] = useState("Hoy");
  const [campos, setCampos] = useState({
    id_device: "",
    id_recorrido: "",
    hora: moment(),
  });
  //const [check, setCheck] = useState("nuevo");
  const [processing, setProcessing] = useState(false);

  const handleFecha = (e) => {
    setFecha(e.target.value);
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

  const handleSubmit = async () => {
    console.log(campos);
    setProcessing(true);
    setLoad(true);
    //Creacion de las rutas de acuerdo al dispositivo seleccionado
    let Rutas = await getRutas();
    const searchRuta = Boolean(
      Rutas.find((r) => r.iddevice === parseInt(campos.id_device))
    );
    if (!searchRuta) {
      console.log(await camposRuta(null));
    } else {
      const checkRuta = await getRutaById({ id: campos.id_device });
      if (checkRuta.length > 0) {
        console.log(await camposRuta(checkRuta[0].id_ruta));
      }
    }
    Rutas = await getRutas();

    const getFechaInterval = selectDate({ fecha });

    const getGeofenceEvent = await geofenceEvent({
      deviceId: campos.id_device,
      from: getFechaInterval.from.toISOString(),
      to: getFechaInterval.to.toISOString(),
    });

    try {
      const tableContent = await getTableContent({
        ruta: Rutas,
        recorrido,
        devices: [
          devices.find((device) => device.id === parseInt(campos.id_device)),
        ],
        geofences,
        Event: getGeofenceEvent,
        getFechaInterval,
      });
      console.log(
        tableContent.filter((T) => T.id_device === parseInt(campos.id_device))
      );
      setInfoTable(
        Array.isArray(tableContent)
          ? tableContent.filter(
              (T) => T.id_device === parseInt(campos.id_device)
            )
          : []
      );
      setError("");
      setCampos({
        id_device: "",
        id_recorrido: "",
        hora: moment(),
      });
      setFecha("Hoy");
    } catch (error) {
      if (getGeofenceEvent.length === 0) {
        setError(`No se ha recibido ningun evento`);
      } else {
        setError(`Ha ocurrido un error: ${JSON.stringify(error)}`);
      }
    }
    setProcessing(false);
    setLoad(false);
  };

  const handleChangeRecorrido = (e, name) => {
    let nombre = e ? e.target.value : name;
    setCampos((campo) => {
      return {
        ...campo,
        id_recorrido: nombre,
      };
    });
    const Item = recorrido
      .filter((rec) => rec.nombre === nombre)
      .sort((a, b) => a.posicion - b.posicion);
    const displayNombre = geofences.find(
      (device) => device.id === Item[Item.length - 1].id_geocerca_2
    );
    if (typeof displayNombre !== "object") {
      throw new Error("No se encontro");
    }
    setDestino(displayNombre.name);
  };

  /*const handleChangeSwitch = (e) => {
    setCheck(e.target.value);
  };*/

  useEffect(() => {
    (async function () {
      const Recorridos = await getRecorridos();
      const Geocercas = await getGeofences();
      const Devices = await getDevices();
      /*const Rutas = await getRutas();
      const RutasFilter =
        Rutas && Rutas.length
          ? Rutas.map((R) => {
              return Devices && Devices.length
                ? Devices.find((D) => D.id === R.iddevice)
                : null;
            })
          : [];
      setRutasToF(Rutas);
      setDeviceRuta(RutasFilter);*/
      setDevices(Devices);
      setRecorrido(Recorridos.response);
      setNombresR(Recorridos.nombres);
      setGeofences(Geocercas);
    })();
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          {/*<div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={check}
                onChange={handleChangeSwitch}
              >
                <FormControlLabel
                  value="nuevo"
                  control={<Radio />}
                  label="Nuevo"
                />
                <FormControlLabel
                  value="existente"
                  control={<Radio />}
                  label="Existente"
                />
              </RadioGroup>
            </FormControl>
          </div>*/}
          <div
            className="DispositivoInput"
            //style={{ display: check === "nuevo" ? "block" : "none" }}
          >
            <h3>Nuevo</h3>
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
                onChange={(e) => handleChangeRecorrido(e, null)}
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
              fullWidth
            />
            <TextField
              margin="normal"
              variant="filled"
              label="Fecha y hora de ingreso"
              type="time"
              fullWidth
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
          </div>
          {/*<div
                      className="DispositivoInput"
                      style={{ display: check === "existente" ? "block" : "none" }}
                  >
                      <h3>Existente</h3>
                      <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="dispositivo">Dispositivo</InputLabel>
                          <Select
                              native
                              inputProps={{
                                  name: "dispositivo",
                                  id: "dispositivo",
                              }}
                              value={campos.id_device}
                              onChange={(e) => {
                                  setCampos((campo) => {
                                      return {
                                          ...campo,
                                          id_device: e.target.value,
                                      };
                                  });
                                  const rutFilter = rutasToF.find(
                                      (Rt) => Rt.iddevice === parseInt(e.target.value)
                                  );
                                  const recFilter = recorrido.find(
                                      (re) => re.id_recorrido === rutFilter.iddevice
                                  );
                                  handleChangeRecorrido(
                                      null,
                                      recFilter ? recFilter.id_recorrido : "N/A"
                                  );
                              }}
                          >
                              <option aria-label="None" value="" />
                              {deviceRuta &&
                                  deviceRuta.length &&
                                  !deviceRuta.error &&
                                  deviceRuta.map((device) => {
                                      return (
                                          <option key={device.id} value={device.id}>
                                              {device.name}
                                          </option>
                                      );
                                  })}
                          </Select>
                      </FormControl>
                      <TextField
                          type="text"
                          placeholder="Hora"
                          disabled
                          value={destino || ""}
                      />
                      <TextField
                          type="text"
                          placeholder="Destino"
                          disabled
                          value={destino || ""}
                      />
                                </div>*/}
        </div>

        <div className="Filtro">
          <form className="Devices">
            <div>
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    <MenuItem value="SemanaAnterior">Semana Anterior</MenuItem>
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
          disabled={
            !Boolean((campos.id_device && campos.id_recorrido) || processing)
          }
        >
          Aceptar
        </Button>
      </CardActions>
    </Card>
  );
}
