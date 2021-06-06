import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import TableLoader from "./components/TableLoader";
import NoRows from "./components/NoRows";

export default function RouteTable({ rows, loading }) {
  const columns = [
    { field: "dispositivo", headerName: "Dispositivo", width: 200 },
    { field: "geocerca", headerName: "Geocerca", width: 200 },
    {
      field: "fechaE",
      headerName: "Fecha de entrada a la geocerca",
      width: 150,
    },
    {
      field: "fechaS",
      headerName: "Fecha de Salida a la geocerca",
      width: 150,
    },
    { field: "diferencia", headerName: "Diferencia", width: 150 },
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
