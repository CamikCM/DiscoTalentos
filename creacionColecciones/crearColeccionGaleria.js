
const db = require('./firebase-admin.js');
const ip = 'https://images.unsplash.com/';
const ip2 = 'http://192.168.100.45:2000/';

const crearColeccionGaleria = async () => {
  try {
    // Categoría: Eventos
    await db.collection("galeria").doc("eventos").collection("items").add({
      title: "Noche de DJ",
      description: "Festival Electrónico 2023",
      imageUrl: `${ip}photo-1516450360452-9312f5e86fc7`
    });
    await db.collection("galeria").doc("eventos").collection("items").add({
      title: "Fiesta de Luces",
      description: "Inauguración Temporada",
      imageUrl: `${ip}photo-1470225620780-dba8ba36b745`
    });
    await db.collection("galeria").doc("eventos").collection("items").add({
      title: "Festival de Verano",
      description: "Summer Vibes 2023",
      imageUrl: `${ip}photo-1429962714451-bb934ecdc4ec`
    });
    await db.collection("galeria").doc("eventos").collection("items").add({
      title: "Noche de Rock",
      description: "Tributo a Legendas",
      imageUrl: `${ip}photo-1504704911898-68304a7d2807`
    });

    // Categoría: Fiestas
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Noche Latina",
      description: "Salsa & Bachata",
      imageUrl: `${ip}photo-1492684223066-81342ee5ff30`
    });
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Party Weekend",
      description: "Sábados de Fiesta",
      imageUrl: `${ip}photo-1438557068880-c5f474830377`
    });
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Noche de Reggaeton",
      description: "Perreo Intenso",
      imageUrl: `${ip}photo-1533174072545-7a4b6ad7a6c3`
    });
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Foam Party",
      description: "Fiesta de Espuma",
      imageUrl: `${ip}photo-1542628682-88321d2a4828`
    });

    // Categoría: Ambiente
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Zona VIP",
      description: "Área Exclusiva",
      imageUrl: `${ip}photo-1566737236500-c8ac43014a67`
    });
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Dance Floor",
      description: "Pista Principal",
      imageUrl: `${ip}photo-1514525253161-7a46d19cd819`
    });
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Barra Premium",
      description: "Los Mejores Cócteles",
      imageUrl: `${ip}photo-1597075687499-d5c9e981540b`
    });
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Lounge Area",
      description: "Zona de Descanso",
      imageUrl: `${ip}photo-1572116469696-31de0f17cc34`
    });
    // Categoría: Eventos
    await db.collection("galeria").doc("eventos").collection("items").add({
      title: "Noche de Fiesta",
      description: "Evento musical en vivo",
      imageUrl: `${ip2}evento.png`
    });
    await db.collection("galeria").doc("eventos").collection("items").add({
      title: "Concierto de Rock",
      description: "Evento de música rock en vivo",
      imageUrl: `${ip2}evento2.jpeg`
    });

    // Categoría: Fiestas
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Fiesta de Cumpleaños",
      description: "Fiesta de cumpleaños con amigos y familiares",
      imageUrl: `${ip2}fiesta.jpg`
    });
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Fiesta de Graduación",
      description: "Fiesta de graduación con amigos y familiares",
      imageUrl: `${ip2}fiesta4.jpeg`
    });

    
    await db.collection("galeria").doc("fiestas").collection("items").add({
      title: "Fiesta de Año Nuevo",
      description: "Fiesta de año nuevo con amigos y familiares",
      imageUrl: `${ip2}fiesta6.jpeg`
    });

    // Categoría: Ambiente
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Ambiente de Fiesta",
      description: "Ambiente festivo con luces y música",
      imageUrl: `${ip2}ambiente1.jpg`
    });
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Ambiente Nocturno",
      description: "Ambiente nocturno con luces y sombras",
      imageUrl: `${ip2}ambiente2.jpeg`
    });
    await db.collection("galeria").doc("ambiente").collection("items").add({
      title: "Ambientes Festivos",
      description: "Ambientes festivos con decoraciones y música",
      imageUrl: `${ip2}ambientes.jpeg`
    });


    console.log("Colección de galería creada con éxito");
  } catch (error) {
    console.error("Error al crear la colección de galería:", error);
  }
};

crearColeccionGaleria();
