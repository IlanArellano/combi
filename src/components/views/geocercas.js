import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  tableContent: {
    margin: "10px 1%",
  },
  table: {
    border: "1px solid rgba(0,0,0,0.1)",
  },
  tableTitle: {
    fontWeight: "bold",
  },
}));

export default function DispositivosTable() {
  const classes = useStyles();

  /*console.log({
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

  const handleEliminar = async (id) => {
    const Delete = await deleteDevices({ id });
    console.log(rows.find((row) => row.id === id));
    console.log(Delete);
  };*/

  return (
    <div className={classes.tableContent}>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTitle}>Dispositivo</TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Lugar de Origen
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Lugar de destino
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Fecha de Inicio
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Recorrido
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Hora
              </TableCell>
              <TableCell align="right" className={classes.tableTitle}>
                Diferencia
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">01</TableCell>
              <TableCell align="right">Sat</TableCell>
              <TableCell align="right">Nosat</TableCell>
              <TableCell align="right">2021-06-12T12:59:35.000</TableCell>
              <TableCell align="right">
                <li>Ruta 1</li>
                <li>Ruta 2</li>
                <li>Ruta 3</li>
                <li>Ruta 4</li>
                <li>Ruta 5</li>
                <li>Ruta 6</li>
              </TableCell>
              <TableCell align="right">
                <li>2:30</li>
                <li>2:30</li>
                <li>2:30</li>
                <li>2:30</li>
                <li>2:30</li>
                <li>2:30</li>
              </TableCell>
              <TableCell align="right">
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
