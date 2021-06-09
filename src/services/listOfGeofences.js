const getUser = window.localStorage.getItem("user") || null;

export const getGeofences = async () => {
  try {
    const res = await fetch(
      `http://${process.env.REACT_APP_API_URL}/api/geofences`,
      {
        headers: {
          Authorization: `Basic ${getUser}`,
          Accept: "application/json",
        },
      }
    );
    if (res.ok && res.status === 200) {
      const Geofences = await res.json();
      return Geofences;
    }
    return null;
  } catch (error) {
    return {
      error,
    };
  }
};
