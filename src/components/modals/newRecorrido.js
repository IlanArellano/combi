import React from "react";
import ReactDOM from "react-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Cancel from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

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
    margin: "10% 0 0 25%",
    top: "50%",
    left: "25%",
    background: "#ffffff",
    width: "50%",
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
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px",
  },
  newButtons: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
  },
}));

function NewRecorrido({ modal, setModal, nombre, setNombre, handleSubmit }) {
  const classes = useStyles();

  const handleClose = () => {
    setModal(false);
  };

  return (
    <Modal
      open={modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modalStyle}>
        <div className={classes.header}>
          <h3 style={{ color: "#ffffff", marginLeft: "15px" }}>
            Nuevo Recorrido
          </h3>
          <Tooltip title="Cerrar" placement="top" arrow>
            <IconButton onClick={() => handleClose()}>
              <Cancel style={{ fontSize: 30, color: "red" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.content}>
          <div className={classes.newInput}>
            <TextField
              type="text"
              placeholder="Ingresa el nombre del recorrido"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className={classes.newButtons}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
              disabled={!Boolean(nombre)}
            >
              Aceptar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClose()}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function ModalTipo({
  modal,
  setModal,
  nombre,
  setNombre,
  handleSubmit,
}) {
  return ReactDOM.createPortal(
    <NewRecorrido
      modal={modal}
      setModal={setModal}
      nombre={nombre}
      setNombre={setNombre}
      handleSubmit={handleSubmit}
    />,
    document.getElementById("Modal")
  );
}
