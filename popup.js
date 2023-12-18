document.addEventListener('DOMContentLoaded', function() {
    //fetchXahauPrice();
    updatePriceEvery30Seconds();
  });
  
  function fetchAndUpdatePrice() {
    
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=xahau&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
        const xahauPrice = data.xahau.usd;
        //const badgeText = xahauPrice;
        //const formattedPrice = xahauPrice.toString().slice(0, -3);
        const formattedPrice = `${xahauPrice.toFixed(2)}`;
        document.getElementById('price').textContent = `$${xahauPrice}`;
        chrome.runtime.sendMessage({price: `$${xahauPrice}`});
        //chrome.runtime.sendMessage({ badgeText: `$${xahauPrice}` });
        //chrome.action.setBadgeText({ text: `${xahauPrice}` });
        //chrome.runtime.sendMessage({ badgeText: `$${formattedPrice}` });
        chrome.action.setBadgeText({ text: `${formattedPrice}` });
        chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }); // Color rojo: [R, G, B, A]
      })
      .catch(error => {
        console.error('Error fetching Xahau price:', error);
        document.getElementById('price').textContent = 'Error fetching price';
        chrome.action.setBadgeText({ text: 'Error' });
        chrome.runtime.sendMessage({ badgeText: `Error` });
      chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); // Color rojo: [R, G, B, A]
      });
  }
  

  function updatePriceEvery30Seconds() {
    fetchAndUpdatePrice(); // Actualizar el precio inmediatamente al cargar la extensión
  
    setInterval(fetchAndUpdatePrice, 120000); // Actualizar cada 1 minutos
  }