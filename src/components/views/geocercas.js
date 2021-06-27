import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
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

export default function DispositivosTable({ tableInfo, error, load }) {
  const classes = useStyles();

  return (
    <div className={classes.tableContent}>
      {load ? (
        <LinearProgress />
      ) : (
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableTitle}>
                  Dispositivo
                </TableCell>
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
                <TableCell align="center" className={classes.tableTitle}>
                  Hora y Diferencia
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <div>{error}</div>
              ) : (
                tableInfo &&
                tableInfo.length > 0 &&
                tableInfo.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="right">{item.dispositivo}</TableCell>
                      <TableCell align="right">{item.lugarO}</TableCell>
                      <TableCell align="right">{item.lugarD}</TableCell>
                      <TableCell align="right">{item.fecha}</TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          <li>Inicio</li>
                          <br />
                          {item.recorrido.map((rec) => {
                            return (
                              <div key={rec.id}>
                                <li>{rec.nombreGeocerca1}</li>
                                <li>{rec.nombreGeocerca2}</li>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <li>{item.inicio}</li>
                            <br />
                            {item.hora.map((h, i) => {
                              return (
                                <div key={i}>
                                  <li>{h.geocerca1}</li>
                                  <li>{h.geocerca2}</li>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            <li
                              style={{
                                color: item.diffInicio <= 0 ? "blue" : "red",
                              }}
                            >
                              {item.diffInicio}
                            </li>
                            <br />
                            {item.hora.map((hor, i) => {
                              return (
                                <div key={i}>
                                  <br />
                                  <li
                                    style={{
                                      color:
                                        hor.diferencia <= 0 ? "blue" : "red",
                                    }}
                                  >
                                    {hor.diferencia}
                                  </li>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
