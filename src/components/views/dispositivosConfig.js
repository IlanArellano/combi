import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";

import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteDevices } from "../../services/deviceAPIservice";
import { deleteRuta } from "../../services/rutasService";

const useStyles = makeStyles((theme) => ({
  tableContent: {
    margin: "10px 5%",
  },
  table: {
    border: "1px solid rgba(0,0,0,0.1)",
  },
  tableTitle: {
    fontWeight: "bold",
  },
}));

export default function DispositivosTable({
  rows,
  devices,
  recorrido,
  geofences,
  handleEditar,
}) {
  const classes = useStyles();

  console.log({
    rows,
    devices,
    recorrido,
    geofences,
  });

  const deviceFilter = (id) => {
    const Filter = devices.find((device) => device.id === id);
    if (!Filter) {
      return {
        name: "No se encontró",
      };
    }
    return Filter;
  };

  const getRecorrido = (id) => {
    const Filter = recorrido.find((r) => r.id_recorrido === id);
    if (!Filter) {
      return {
        name: "No se encontró",
      };
    }
    return {
      name: Filter.nombre,
    };
  };

  const recorridoFilter = (id) => {
    const Filter = recorrido
      .filter((rec) => rec.id_recorrido === id)
      .sort((a, b) => a.posicion - b.posicion);
    if (!Filter) {
      return {
        name: "No se encontró",
      };
    }
    const displayNombre = geofences.find(
      (device) => device.id === Filter[Filter.length - 1].id_geocerca_2
    );
    if (!displayNombre) {
      return {
        name: "No se encontró",
      };
    }
    return displayNombre;
  };

  const handleEliminar = async (id, device) => {
    const Delete = await deleteDevices({ id });
    const deleteRoute = await deleteRuta({ id: device });
    console.log(Delete);
    console.log(deleteRoute);
  };

  return (
    <div className={classes.tableContent}>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTitle}>Dispositivo</TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Recorrido
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Destino
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Hora de ingreso
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.length > 0 &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {`${deviceFilter(row.id_device).name}`}
                  </TableCell>
                  <TableCell align="right">
                    {`${getRecorrido(row.id_recorrido).name}`}
                  </TableCell>
                  <TableCell align="right">
                    {`${recorridoFilter(row.id_recorrido).name}`}
                  </TableCell>
                  <TableCell align="right">{row.hora}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar" placement="top" arrow>
                      <IconButton onClick={() => handleEditar(row.id)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar" placement="top" arrow>
                      <IconButton
                        onClick={() => handleEliminar(row.id, row.id_device)}
                      >
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
  );
}
