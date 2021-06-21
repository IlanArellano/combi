const getUser = window.localStorage.getItem("user") || null;

export default async function getDevices() {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/devices`, {
      headers: {
        Authorization: `Basic ${getUser}`,
      },
    });
    if (res.ok && res.status === 200) {
      const devices = await res.json();
      return devices;
    }
    return null;
  } catch (error) {
    return { error };
  }
}
