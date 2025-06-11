
const db = require('./firebase-admin.js');
const ip = 'http://192.168.100.45:2000/';

const crearColeccion = async () => {
  try {
    // Categoría: Cervezas
    await db.collection("menu").doc("beers").collection("items").add({
      name: "Paceña",
      description: "Cerveza fría para calmar el calor de la pista",
      price: 8,
      imageUrl: `${ip}paceña.jpg`
    });
    await db.collection("menu").doc("beers").collection("items").add({
      name: "Heineken",
      description: "Cerveza premium para disfrutar mientras bailas",
      price: 10,
      imageUrl: `${ip}heineken.jpg`
    });
    await db.collection("menu").doc("beers").collection("items").add({
      name: "Corona",
      description: "Cerveza mexicana para acompañar tus noches de fiesta",
      price: 12,
      imageUrl: `${ip}corona.jpg`
    });

    // Categoría: Cócteles
    await db.collection("menu").doc("cocktails").collection("items").add({
      name: "Margarita",
      description: "Cóctel clásico para disfrutar mientras bailas",
      price: 15,
      imageUrl: `${ip}margarita.jpg`
    });
    await db.collection("menu").doc("cocktails").collection("items").add({
      name: "Piña Colada",
      description: "Cóctel tropical para sentirte en una isla mientras bailas",
      price: 18,
      imageUrl: `${ip}piña_colada.jpg`
    });
    await db.collection("menu").doc("cocktails").collection("items").add({
      name: "Whisky Sour",
      description: "Cóctel intenso para disfrutar en la pista",
      price: 20,
      imageUrl: `${ip}whisky_sour.jpg`
    });

    // Categoría: Shots
    await db.collection("menu").doc("shots").collection("items").add({
      name: "Tequila",
      description: "Shot de tequila para calentar la noche",
      price: 5,
      imageUrl: `${ip}tequila.jpg`
    });
    await db.collection("menu").doc("shots").collection("items").add({
      name: "Kamikaze",
      description: "Shot explosivo para una noche inolvidable",
      price: 6,
      imageUrl: `${ip}kamikaze.jpg`
    });
    await db.collection("menu").doc("shots").collection("items").add({
      name: "Fireball",
      description: "Shot de whisky con especias para sentir el fuego",
      price: 8,
      imageUrl: `${ip}fireball.jpg`
    });

    console.log("Colección creada con éxito");
  } catch (error) {
    console.error("Error al crear la colección:", error);
  }
};

crearColeccion();