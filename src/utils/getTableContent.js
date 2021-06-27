import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
moment.locale("es");

export const getTableContent = ({
  ruta,
  recorrido,
  devices,
  geofences,
  Event,
  getFechaInterval,
}) => {
  console.log({
    ruta,
    recorrido,
    devices,
    geofences,
    Event,
    getFechaInterval,
  });
  return new Promise((resolve, reject) => {
    try {
      const getTableInfo = ruta.map((r) => {
        const getDevice = devices.find(
          (devicess) => devicess.id === r.iddevice
        );
        const getLugarO = geofences.find(
          (geofence) => geofence.id === r.idlugaro
        );
        const getLugarD = geofences.find(
          (geofence) => geofence.id === r.idlugard
        );
        const getRutas = recorrido
          .filter((rec) => rec.id_recorrido === r.id_recorrido)
          .sort((a, b) => a.posicion - b.posicion);
        return {
          id_device: getDevice ? getDevice.id : "Desconocido",
          dispositivo: getDevice ? getDevice.name : "Desconocido",
          lugarO: getLugarO ? getLugarO.name : "Desconocido",
          lugarD: getLugarD ? getLugarD.name : "Desconocido",
          recorrido: getRutas.map((rrec) => {
            const nombreGeocerca1 = geofences.find(
              (geo) => geo.id === rrec.id_geocerca_1
            );
            const nombreGeocerca2 = geofences.find(
              (geo) => geo.id === rrec.id_geocerca_2
            );
            return {
              ...rrec,
              nombreGeocerca1: nombreGeocerca1
                ? nombreGeocerca1.name
                : "Desconocido",
              nombreGeocerca2: nombreGeocerca2
                ? nombreGeocerca2.name
                : "Desconocido",
            };
          }),
        };
      });

      let finalTable = [];
      let posicion = [];
      let exclude = [];
      let i = 0;
      do {
        for (let j = i; j < Event.length; j++) {
          let element = Event[i];
          if (
            new Date(
              moment(element.serverTime).startOf("day").toISOString()
            ).getTime() <= new Date(Event[j].serverTime).getTime() &&
            new Date(Event[j].serverTime).getTime() <=
              new Date(
                moment(element.serverTime).endOf("day").toISOString()
              ).getTime()
          ) {
            posicion.push(Event[j]);
          } else {
            exclude.push(j);
          }
        }
        exclude = exclude.sort((a, b) => a - b);
        i = exclude[0];
        finalTable.push(posicion);
        //Reset
        posicion = [];
        exclude = [];
      } while (i < Event.length);
      let Result = [];

      for (let i = 0; i < getTableInfo.length; i++) {
        for (let j = 0; j < finalTable.length; j++) {
          const findDev = devices.find(
            (de) => de.name === getTableInfo[i].dispositivo
          );
          const findInicio = ruta.find((rta) => rta.iddevice === devices[0].id);
          const dateInicio = findInicio ? findInicio.fechaI : "N/A";
          const Milli = dateInicio.split(":");
          const lastInicio = Milli[2].split(" ");
          const evaTime = () => {
            let result;
            if (lastInicio[1].toLowerCase() === "am") {
              if (parseInt(Milli[0]) === 12) {
                result = parseInt(`0${parseInt(Milli[0]) - 12}`);
              }
              if (parseInt(Milli[0]) < 10) {
                result = parseInt(`0${Milli[0]}`);
              }
            } else {
              if (parseInt(Milli[0]) === 12) {
                result = parseInt(Milli[0]);
              } else {
                result = parseInt(Milli[0]) + 12;
              }
            }
            return result;
          };

          const convertTime = `${evaTime()}:${Milli[1]}:${lastInicio[0]}`;
          const TimeinMilli = moment(finalTable[j][i].serverTime)
            .startOf("day")
            .format(`MMMM D, YYYY [${convertTime}]`);
          Result.push({
            ...getTableInfo[i],
            inicio: dateInicio,
            diffInicio: TimeinMilli
              ? Math.floor(
                  (new Date(TimeinMilli).getTime() -
                    new Date(finalTable[j][i].serverTime).getTime()) /
                    60000
                )
              : "N/A",
            fecha: moment(finalTable[j][i].serverTime).format("MMMM Do YYYY"),
            hora: findDev
              ? getTableInfo[i].recorrido.map((ree) => {
                  const geocerca1 = finalTable[j].filter(
                    (item) =>
                      item.deviceId === findDev.id &&
                      item.geofenceId === ree.id_geocerca_1
                  );
                  const geocerca2 = finalTable[j].filter(
                    (item) =>
                      item.deviceId === findDev.id &&
                      item.geofenceId === ree.id_geocerca_2
                  );

                  const diferencia =
                    geocerca1 &&
                    geocerca2 &&
                    geocerca1.length > 0 &&
                    geocerca2.length > 0
                      ? (new Date(geocerca2[0].serverTime).getTime() -
                          new Date(geocerca1[0].serverTime).getTime()) /
                        60000
                      : "-";
                  return {
                    geocerca1:
                      geocerca1 && geocerca1.length > 0
                        ? moment(geocerca1[0].serverTime).format("hh:mm a")
                        : "N/A",
                    geocerca2:
                      geocerca2 && geocerca2.length > 0
                        ? moment(geocerca2[0].serverTime).format("hh:mm a")
                        : "N/A",
                    diferencia:
                      typeof diferencia === "number"
                        ? Math.floor(diferencia) - ree.minutos
                        : diferencia,
                  };
                })
              : "Error",
          });
        }
      }

      resolve(Result);
    } catch (error) {
      reject({ error });
    }
  });
};
