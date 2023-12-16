chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.badgeText) {
    chrome.action.setBadgeText({ text: request.badgeText });
    chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }); // Color transparente
  }

  if (request.price) {
    // Puedes manejar la información del precio aquí si es necesario en el background.js
    // Por ejemplo, puedes almacenarla en el almacenamiento local si quieres usarla después
  }
});
