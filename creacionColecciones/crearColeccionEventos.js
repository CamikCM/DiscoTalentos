
const db = require('./firebase-admin.js');
const ip = 'http://192.168.100.45:2000/';

const crearColeccionEventos = async () => {
  try {
    const eventos = [
      {
        fecha: "15 de Diciembre 2025",
        nombre: "Noche de Fiesta con Diego Rios",
        descripcion: "Disfruta de una noche inolvidable con el DJ Diego Rios, quien te hará bailar con sus mejores ritmos y canciones. ¡No te pierdas esta oportunidad de divertirte!",
        precio: 40,
        imagen: `${ip}diegorios.jpg`
      },
      {
        fecha: "22 de Diciembre 2025",
        nombre: "Manager en la Casa",
        descripcion: "El DJ Manager trae la mejor música para ti, con un repertorio que incluye los éxitos más populares de la escena electrónica. ¡Prepárate para una noche de fiesta!",
        precio: 35,
        imagen: `${ip}djmanager.jpg`
      },
      {
        fecha: "31 de Diciembre 2025",
        nombre: "Party Night con DJ Party Night",
        descripcion: "Celebra el fin de año con el DJ Party Night, quien te hará disfrutar de una noche épica de música electrónica y efectos visuales. ¡No te pierdas la cuenta regresiva para el año nuevo!",
        precio: 60,
        imagen: `${ip}djPartynight.jpg`
      },
      {
        fecha: "5 de Enero 2026",
        nombre: "Wilor en la pista",
        descripcion: "Disfruta de la música del DJ Wilor, quien te hará bailar con sus ritmos y melodías únicas. ¡Prepárate para una noche de diversión y música en vivo!",
        precio: 30,
        imagen: `${ip}djwilor.jpg`
      }
    ];

    for (const evento of eventos) {
      const docRef = db.collection("eventos").doc();
      await docRef.set(evento);
      console.log(`Evento agregado con ID: ${docRef.id}`);
    }

    console.log("Colección de eventos creada con éxito");
  } catch (error) {
    console.error("Error al crear la colección de eventos:", error);
  }
};

crearColeccionEventos();
