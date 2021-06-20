import axios from "axios";

const getUser = window.localStorage.getItem("user") || null;

export const getRutas = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_COMBI_API}/api/rutas/${getUser}`
    );
    return res.data;
  } catch (error) {
    return { error };
  }
};

export const getRutaById = async ({ id }) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_COMBI_API}/api/rutas/${getUser}/${id}`
    );
    return res.data;
  } catch (error) {
    return { error };
  }
};

export const addOrUpdateRuta = async ({
  id,
  idlugaro,
  idlugard,
  fechaI,
  id_recorrido,
  iddevice,
}) => {
  const campos = {
    idlugaro,
    idlugard,
    fechaI,
    id_recorrido,
    iddevice,
  };
  try {
    if (id) {
      const EditRuta = await axios.put(
        `${process.env.REACT_APP_COMBI_API}/api/rutas/${getUser}/${id}`,
        campos
      );
      return EditRuta;
    }
    const AddRuta = await axios.post(
      `${process.env.REACT_APP_COMBI_API}/api/rutas/${getUser}`,
      campos
    );
    return AddRuta;
  } catch (error) {
    return { error };
  }
};

export const deleteRuta = async ({ id }) => {
  try {
    const DeleteRuta = await axios.delete(
      `${process.env.REACT_APP_COMBI_API}/api/rutas/${getUser}/${id}`
    );
    console.log(DeleteRuta);
  } catch (error) {
    return { error };
  }
};
