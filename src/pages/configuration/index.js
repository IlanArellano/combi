import React, { useState, useEffect } from "react";
import GeneralConfig from "../../components/config/config";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import TipoModal from "../../components/modals/tipo";
import NewRecorrido from "../../components/modals/newRecorrido";
import {
  getRecorridos,
  deleteRecorrido,
} from "../../services/recorridoService";

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
}));

export default function Configuration() {
  const [recorrido, setRecorrido] = useState([]);
  const [recorridoFilter, setRecorridoFilter] = useState([]);
  const [nombresR, setNombresR] = useState([]);
  const [display, setDisplay] = useState("");
  const [nombre, setNombre] = useState("");
  const [newNombre, setNewNombre] = useState("");
  const [modalTipo, setModalTipo] = useState(false);
  const [modalNew, setModalNew] = useState(false);
  const classes = useStyles();

  const handleConfig = () => {
    setRecorridoFilter(
      recorrido
        .filter((rec) => rec.nombre === nombre)
        .sort((a, b) => a.posicion - b.posicion)
    );
    setNewNombre("");
    setDisplay(nombre);
  };

  const handleNewRecorrido = () => {
    const newItem = {
      id: null,
      nombre: newNombre,
      id_recorrido: Math.round(Math.random() * 100 * (Math.random() * 10)),
      posicion: 1,
      id_geocerca_1: "",
      id_geocerca_2: "",
      minutos: "",
    };
    setRecorridoFilter([newItem]);
    setDisplay("");
    setModalNew(false);
  };

  const handleEliminar = async () => {
    const Item = recorrido.filter((rec) => rec.nombre === nombre);
    const Delete = await deleteRecorrido({ id: Item[0].id_recorrido });
    setNombresR((nom) => nom.filter((item) => item !== nombre));
    setNombre("");
    console.log(Delete);
  };

  useEffect(() => {
    (async function () {
      const response = await getRecorridos();
      setRecorrido(response.response);
      setNombresR(response.nombres);
    })();
  }, []);
  return (
    <>
      <div className="GeneralMain">
        <div className="GeneralControl">
          <div className="DeviceControl">
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor={`geocerca1`}>
                  Selecciona el Recorrido
                </InputLabel>
                <Select
                  native
                  inputProps={{
                    name: `geocerca1`,
                    id: `geocerca1`,
                  }}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
            </div>
            <div className="DeviceButtons">
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleConfig}
                disabled={!Boolean(nombre)}
              >
                Configurar Recorrido
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                disabled={!Boolean(nombre)}
                onClick={handleEliminar}
              >
                Eliminar Recorrido
              </Button>
            </div>
          </div>
          <div className="DeviceButtons">
            <TextField
              type="text"
              placeholder="Nombre del recorrido"
              value={display || newNombre}
              disabled
            />
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setModalTipo(true)}
              disabled
            >
              Configurar Tipo
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setModalNew(true)}
            >
              Nuevo Recorrido
            </Button>
          </div>
        </div>
        {recorridoFilter && recorridoFilter.length > 0 && (
          <GeneralConfig
            config={recorridoFilter}
            setConfig={setRecorridoFilter}
          />
        )}
      </div>
      <TipoModal modal={modalTipo} setModal={setModalTipo} />
      <NewRecorrido
        modal={modalNew}
        setModal={setModalNew}
        nombre={newNombre}
        setNombre={setNewNombre}
        handleSubmit={handleNewRecorrido}
      />
    </>
  );
}
