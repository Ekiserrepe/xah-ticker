chrome.runtime.onInstalled.addListener(() => {
  function updateBadge(price) {
    chrome.action.setBadgeText({ text: xahauPrice.toString() });
  }

  function fetchXahauPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=xahau&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
         const xahauPrice = data.xahau.usd;
         const formattedPrice = `${xahauPrice.toFixed(3)}`;
        chrome.action.setBadgeText({ text: `${formattedPrice}` });
      })
      .catch(error => {
        console.error('Error fetching Xahau price:', error);
        updateBadge('Error');
      });
  }

  fetchXahauPrice(); 

  
  setInterval(fetchXahauPrice, 300000); 
});
