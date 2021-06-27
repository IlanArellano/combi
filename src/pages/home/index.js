import React, { useState } from "react";
import Geocerca from "../../components/views/geocercas";
import HomeConfig from "../../components/config/homeConfig";

export default function Home() {
  const [infoTable, setInfoTable] = useState([]);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Esta es la pagina de inicio</h3>
      <HomeConfig
        setInfoTable={setInfoTable}
        setLoad={setLoad}
        setError={setError}
      />
      <div className="Tabla">
        <Geocerca tableInfo={infoTable} load={load} error={error} />
      </div>
    </div>
  );
}
