import React, { useState } from "react";
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

export default function DispositivosTable() {
  const classes = useStyles();

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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">4:00 pm</TableCell>
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
  );
}
