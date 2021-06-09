import React, { useState } from "react";
import GeneralConfig from "../../components/config/config";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TipoModal from "../../components/modals/tipo";

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
  const [modalTipo, setModalTipo] = useState(false);
  const classes = useStyles();
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
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Todos los dispositivos</option>
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </div>
            <div className="DeviceButtons">
              <Button size="small" variant="contained" color="primary">
                Configurar ruta
              </Button>
              <Button size="small" variant="contained" color="secondary">
                Eliminar ruta
              </Button>
            </div>
          </div>
          <div className="DeviceButtons">
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setModalTipo(true)}
            >
              Configurar Tipo
            </Button>
            <Button size="small" variant="contained" color="primary">
              Nuevo Recorrido
            </Button>
          </div>
        </div>
        <GeneralConfig />
      </div>
      <TipoModal modal={modalTipo} setModal={setModalTipo} />
    </>
  );
}
