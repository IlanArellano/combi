import axios from "axios";
const getUser = window.localStorage.getItem("user") || null;

export const getRecorridos = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_COMBI_API}/api/recorridos/${getUser}`
    );
    let response =
      res.data && res.data[0].nombre
        ? res.data.sort((a, b) => (a.nombre < b.nombre ? -1 : 1))
        : [];
    let i = 0;
    let nameArray = response.map((item) => item.nombre);
    let nameFilter = [];
    while (i < response.length) {
      if (i > nameArray.length) {
        break;
      }
      let elementFilter = nameArray.lastIndexOf(nameArray[i]);
      nameFilter.push(nameArray[elementFilter]);
      if (
        elementFilter &&
        elementFilter !== -1 &&
        nameArray[elementFilter] === nameArray[elementFilter - 1]
      ) {
        i = elementFilter + 1;
      } else {
        i++;
      }
    }
    return {
      response,
      nombres: nameFilter,
    };
  } catch (error) {
    return { error };
  }
};

export const addRecorridos = async ({
  id_recorrido,
  nombre,
  posicion,
  id_geocerca_1,
  id_geocerca_2,
  minutos,
}) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_COMBI_API}/api/recorridos/${getUser}`,
      {
        id_recorrido,
        nombre,
        posicion,
        id_geocerca_1,
        id_geocerca_2,
        minutos,
        userToken: getUser,
      }
    );

    return response;
  } catch (error) {
    return { error };
  }
};

export const updateRecorridos = async ({
  id,
  id_recorrido,
  posicion,
  id_geocerca_1,
  id_geocerca_2,
  minutos,
}) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_COMBI_API}/api/recorridos/${getUser}/${id}`,
      {
        id_recorrido,
        posicion,
        id_geocerca_1,
        id_geocerca_2,
        minutos,
      }
    );

    return response;
  } catch (error) {
    return { error };
  }
};

export const deleteRecorrido = async ({ id }) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_COMBI_API}/api/recorridos/config/${getUser}/${id}`
    );
    return response;
  } catch (error) {
    return { error };
  }
};

export const deleteRecorridoById = async ({ id }) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_COMBI_API}/api/recorridos/${getUser}/${id}`
    );
    return response;
  } catch (error) {
    return { error };
  }
};
