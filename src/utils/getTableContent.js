import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
//moment.locale("es");

/* prettier-ignore */
export const getTableContent = ({
  ruta,
  recorrido,
  devices,
  geofences,
  Event,
  EventSalida,
  getFechaInterval,
}) => {
  console.log({
    ruta,
    recorrido,
    devices,
    geofences,
    Event,
    EventSalida,
    getFechaInterval,
  });
  try {
    const getTableInfo = ruta.map((r) => {
      const getDevice = devices.find((devicess) => devicess.id === r.iddevice);
      const getLugarO = geofences.find((geofence) => geofence.id === r.idlugaro);
      const getLugarD = geofences.find((geofence) => geofence.id === r.idlugard);
      const getRutas = recorrido
        .filter((rec) => rec.id_recorrido === r.id_recorrido)
        .sort((a, b) => a.posicion - b.posicion);
      let generateEvent = [];
      let generateEventEntrada = [];
      if (EventSalida && EventSalida.length > 0) {
        generateEvent = recorrido.map((route) => {
          const listOfGeofences = EventSalida.filter(
            (geo) =>
              geo.geofenceId === route.id_geocerca_1 ||
              geo.geofenceId === route.id_geocerca_2
          );
          return listOfGeofences;
        });
      }
      if (Event && Event.length > 0) {
        generateEventEntrada = recorrido.map((route) => {
          const listOfGeofencesEntrada = Event.filter(
            (geo) =>
              geo.geofenceId === route.id_geocerca_1 ||
              geo.geofenceId === route.id_geocerca_2
          );
          return listOfGeofencesEntrada;
        });
      }

      const fechaFilter = (fechaServer) =>
        getFechaInterval.from.toDate().getTime() +
          (Parse.horas + Parse.minutes + Parse.seconds) <=
          new Date(fechaServer).getTime() &&
        new Date(fechaServer).getTime() <=
          getFechaInterval.to.toDate().getTime()
          ? true
          : false;

      const fechaa = r.fechaI.split(" ");
      const cambio = fechaa[0].split(":");
      const parseHour =
        fechaa[1].toLowerCase() === "pm"
          ? cambio.splice(0, 1, cambio[0] + 12)
          : cambio;
      const Parse = {
        horas: parseInt(parseHour[0]) * 3600,
        minutes: parseInt(parseHour[1]) * 60,
        seconds: parseInt(parseHour[2]),
      };
      return {
        dispositivo: getDevice ? getDevice.name : 'Desconocido',
        lugarO: getLugarO ? getLugarO.name : 'Desconocido',
        lugarD: getLugarD ? getLugarD.name : 'Desconocido',
        fecha: moment().format(`YYYY-MMMM-DD, [${r.fechaI}]`).toLowerCase(),
        recorrido: getRutas,
        eventoEntrada: generateEventEntrada
          .map((event) => {
            return event
              .filter((e) => fechaFilter(e.serverTime) === true)
              .sort(
                (a, b) =>
                  new Date(a.serverTime).getTime() >
                  new Date(b.serverTime).getTime()
              );
          })
          .map((ev) => {
            return ev.map((e, i) => {
              return {
                punto1: generateEventEntrada.filter(
                  (re) =>
                    recorrido[i].punto1 === e.name &&
                    re.geofenceId === e.geofenceId
                ),
                punto2: generateEventEntrada.filter(
                  (re) =>
                    recorrido[i].punto2 === e.name &&
                    re.geofenceId === e.geofenceId
                ),
              };
            });
          }),
        eventoSalida: generateEvent
          .map((event) => {
            return event
              .filter((e) => fechaFilter(e.serverTime) === true)
              .sort(
                (a, b) =>
                  new Date(a.serverTime).getTime() >
                  new Date(b.serverTime).getTime()
              );
          })
          .map((ev) => {
            return ev.map((e, i) => {
              return {
                punto1: generateEvent.filter(
                  (re) =>
                    recorrido[i].punto1 === e.name &&
                    re.geofenceId === e.geofenceId
                ),
                punto2: generateEvent.filter(
                  (re) =>
                    recorrido[i].punto1 === e.name &&
                    re.geofenceId === e.geofenceId
                ),
              };
            });
          }),
      };
    });

    return getTableInfo;
    /* return getTableInfo.map((mod) => {
      return {
        ...mod,
        eventoEntrada: mod.eventoEntrada.map((ev) => {
          return ev.map((e, i) => {
            return {
              punto1: generateEventEntrada.filter(
                (re) =>
                  recorrido[i].punto1 === e.name &&
                  re.geofenceId === e.geofenceId
              ),
              punto2: generateEventEntrada.filter(
                (re) =>
                  recorrido[i].punto2 === e.name &&
                  re.geofenceId === e.geofenceId
              ),
            };
          });
        }),
        eventoSalida: mod.eventoSalida.map((ev) => {
          return ev.map((e, i) => {
            return {
              punto1: generateEvent.filter(
                (re) =>
                  recorrido[i].punto1 === e.name &&
                  re.geofenceId === e.geofenceId
              ),
              punto2: generateEvent.filter(
                (re) =>
                  recorrido[i].punto1 === e.name &&
                  re.geofenceId === e.geofenceId
              ),
            };
          });
        }),
      };
    });*/
  } catch (error) {
    return { error };
  }
};
