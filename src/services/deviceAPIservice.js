import axios from "axios";
const getUser = window.localStorage.getItem("user") || null;

export const getDevices = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_COMBI_API}/api/devices/${getUser}`
    );
    return res.data;
  } catch (error) {
    return { error };
  }
};

export const getDevicesById = async ({ id }) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_COMBI_API}/api/devices/${getUser}/${id}`
    );
    return res.data;
  } catch (error) {
    return { error };
  }
};

export const addDevices = async ({ id_device, id_recorrido, hora }) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_COMBI_API}/api/devices/${getUser}`,
      {
        id_device,
        id_recorrido,
        hora,
      }
    );
    return res;
  } catch (error) {
    return { error };
  }
};

export const updateDevices = async ({ id, id_recorrido, hora }) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_COMBI_API}/api/devices/${getUser}/${id}`,
      {
        id_recorrido,
        hora,
      }
    );
    return res.data;
  } catch (error) {
    return { error };
  }
};

export const deleteDevices = async ({ id }) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_COMBI_API}/api/devices/${getUser}/${id}`
    );
    return res.data;
  } catch (error) {
    return { error };
  }
};
