import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import TableLoader from "./components/TableLoader";
import NoRows from "./components/NoRows";

export default function RouteTable({ rows, loading }) {
  const columns = [
    { field: "dispositivo", headerName: "Dispositivo", width: 200 },
    { field: "lugarO", headerName: "Lugar de origen", width: 200 },
    {
      field: "lugarDestino",
      headerName: "Lugar de destino",
      width: 200,
    },
    {
      field: "fechaI",
      headerName: "Fecha de Inicio",
      width: 200,
    },
    { field: "recorrido", headerName: "Recorrido", width: 250 },
    { field: "diferencia", headerName: "Dicefencia", width: 200 },
  ];

  const tableRows = rows.map((row) => {
    return {
      id: row.id,
      hora: row.serverTime,
      tipo: row.type,
      geocerca: row.geofence ? row.geofence : "",
      mantenimientos: row.maintenanceId ? row.maintenanceId : "",
    };
  });

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={tableRows && tableRows.length > 0 ? tableRows : []}
        columns={columns}
        components={{
          LoadingOverlay: TableLoader,
          NoRowsOverlay: NoRows,
        }}
        loading={loading}
        hideFooter={false}
      />
    </div>
  );
}
