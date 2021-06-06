const getUser = window.localStorage.getItem("user") || null;

export default async function geofenceEvent({
  deviceId = null,
  from,
  to,
  type = null,
}) {
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
  console.log(res);
}
