import { collection, db, getDocs } from './firebase.js';
document.addEventListener("DOMContentLoaded", () => {
  

  const menuRef = collection(db, "menu", "cocktails", "items");

  getDocs(menuRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const menuItem = doc.data();
        const menuItemHTML = `
          <div class="menu-item">
            <div class="menu-item-content">
              <h3>${menuItem.name}</h3>
              <p class="description">${menuItem.description}</p>
              <div class="price">$${menuItem.price}</div>
            </div>
            <img class="menu-item-image" src="${menuItem.imageUrl}" alt="${menuItem.name}">
          </div>
        `;
        document.querySelector(".menu-grid").innerHTML += menuItemHTML;
      });
    })
    .catch((error) => {
      console.error("Error al leer los datos:", error);
    });
});
