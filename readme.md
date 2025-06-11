# 🎶 DiscoTalentos

**DiscoTalentos** es una plataforma web interactiva para gestionar y promocionar eventos y talentos en una discoteca. Utiliza **Firebase** como backend y está diseñada para ofrecer una experiencia de usuario fluida, segura y moderna.

---

## ⚙️ Configuración del Proyecto

### ✅ Requisitos Previos

- Node.js instalado en tu máquina
- Una cuenta de Firebase configurada
- Archivo `firebase.js` con tus credenciales de Firebase

---

### 🚀 Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/tu-usuario/DiscoTalentos.git
cd DiscoTalentos
```

2. **Instala las dependencias necesarias:**

```bash
npm install firebase firebase-admin
```

> También puedes ejecutar `npm install` si tu `package.json` ya contiene las dependencias listadas.

3. **Configura Firebase:**

Abre el archivo `firebase.js` y reemplaza los valores por tus credenciales de Firebase:

```javascript
// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);

export default app;
```

4. **Inicia el proyecto:**

```bash
npm start
```

---

## ✨ Características

- 🎤 Gestión de eventos y talentos
- 🔐 Autenticación de usuarios con Firebase Authentication
- 🗃️ Almacenamiento de datos en Firebase Firestore
- 📲 Notificaciones push con Firebase Cloud Messaging

---

## 🛠️ Tecnologías Utilizadas

- **Firebase**
  - Authentication
  - Firestore
  - Cloud Messaging
- **Node.js**
- **JavaScript (ES6+)**

---

## 🤝 Contribución

¡Tu ayuda es bienvenida! Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama con tus cambios: `git checkout -b feature/nueva-funcionalidad`
3. Realiza los cambios y haz commit: `git commit -m "Agrega nueva funcionalidad"`
4. Envía un pull request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## 📬 Contacto

¿Tienes dudas o sugerencias?

- ✉️ Correo: [camikko422@gmal.com](camikko422@gmail.com)
- 💻 GitHub: [github.com/CamikCM](https://github.com/CamikCM)

---

> Gracias por usar **DiscoTalentos**. ¡Que el ritmo no pare! 🕺💃
