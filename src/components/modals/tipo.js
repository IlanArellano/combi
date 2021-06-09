import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Cancel from "@material-ui/icons/Cancel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { getGeofences } from "../../services/listOfGeofences";

import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  tableContent: {
    margin: "10px 5%",
    maxHeight: 300,
    overflow: "scroll",
  },
  table: {
    minWidth: 650,
  },
  button: {
    background: "green",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
  },
  modalStyle: {
    margin: "10% 10% 0 10%",
    top: "50%",
    left: "25%",
    background: "#ffffff",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  options: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    margin: "0 20px",
  },
}));

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Tipo({ modal, setModal }) {
  const [geofences, setGeofences] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    (async function () {
      setGeofences(await getGeofences());
    })();
  }, []);

  return (
    <Modal
      open={modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modalStyle}>
        <div className={classes.header}>
          <h3 style={{ color: "#ffffff", marginLeft: "15px" }}>
            Establece el tipo de la geocerca
          </h3>
          <Tooltip title="Cerrar" placement="top" arrow>
            <IconButton onClick={() => handleClose()}>
              <Cancel style={{ fontSize: 30, color: "red" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.options}>
          <Button variant="outlined" size="small" className={classes.button}>
            Agregar tipo
          </Button>
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
                !geofences.error &&
                geofences.map((geofence) => {
                  return (
                    <option key={geofence.id} value={geofence.id}>
                      {geofence.name}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tipoGeo">Tipo</InputLabel>
            <Select
              native
              defaultValue=""
              inputProps={{
                name: "tipoGeo",
                id: "tipoGeo",
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Base</option>
              <option value={10}>Intermedio</option>
            </Select>
          </FormControl>
          <Button variant="outlined" size="small" className={classes.button}>
            Agregar
          </Button>
        </div>
        <div className={classes.tableContent}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Geocerca</TableCell>
                  <TableCell align="right">Tipo</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar" placement="top" arrow>
                        <IconButton>
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar" placement="top" arrow>
                        <IconButton>
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Modal>
  );
}

export default function ModalTipo({ modal, setModal }) {
  return ReactDOM.createPortal(
    <Tipo modal={modal} setModal={setModal} />,
    document.getElementById("Modal")
  );
}
