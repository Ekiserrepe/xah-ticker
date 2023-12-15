// content.js

// Ejemplo: Encuentra un elemento en la página y cambia su contenido
const priceElement = document.querySelector('.xahau-price'); // Supongamos que existe un elemento con clase 'xahau-price'
if (priceElement) {
  // Modifica el texto del elemento para mostrar el precio de Xahau
  priceElement.textContent = 'Precio actual de Xahau: $100'; // Reemplaza con el precio real obtenido desde la extensión
}
