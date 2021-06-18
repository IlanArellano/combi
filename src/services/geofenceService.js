import moment from "moment";
const getUser = window.localStorage.getItem("user") || null;

export default async function geofenceEvent({
  deviceId = null,
  from,
  to,
  type = "geofenceEnter",
}) {
  try {
    const query = new URLSearchParams({ deviceId, from, to, type });
    const res = await fetch(
      `http://${
        process.env.REACT_APP_API_URL
      }/api/reports/events?${query.toString()}`,
      {
        headers: {
          Authorization: `Basic ${getUser}`,
          Accept: "application/json",
        },
      }
    );
    if (res.ok && res.status === 200) {
      const response = await res.json();
      return response;
    }
    return null;
  } catch (error) {
    return { error };
  }
}

export const selectDate = ({ fecha, from = null, to = null }) => {
  switch (fecha) {
    case "Hoy":
      return {
        from: moment().startOf("day"),
        to: moment().endOf("day"),
      };
    case "Ayer":
      return {
        from: moment().subtract(1, "day").startOf("day"),
        to: moment().subtract(1, "day").endOf("day"),
      };
    case "SemanaActual":
      return {
        from: moment().startOf("week"),
        to: moment().endOf("week"),
      };
    case "SemanaAnterior":
      return {
        from: moment().subtract(1, "week").startOf("week"),
        to: moment().subtract(1, "week").endOf("week"),
      };
    case "MesActual":
      return {
        from: moment().startOf("month"),
        to: moment().endOf("month"),
      };
    case "MesAnterior":
      return {
        from: moment().startOf("day"),
        to: moment().endOf("month"),
      };

    default:
      return {
        from,
        to,
      };
  }
};
