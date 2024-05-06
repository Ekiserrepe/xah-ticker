let originalBadgeColor = '';

function updateBadge(price) {
    chrome.action.setBadgeText({ text: price.toString() });

    if (originalBadgeColor === '') {
        chrome.action.getBadgeBackgroundColor({}, result => {
            originalBadgeColor = result;
        });
    }

    chrome.action.setBadgeBackgroundColor({ color: [255, 215, 0, 255] });

    
    setTimeout(() => {
        chrome.action.setBadgeBackgroundColor({ color: originalBadgeColor });
    }, 1000); // (1 second)
}

function fetchxahauPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=xahau&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const xahauPrice = parseFloat(data.xahau.usd);
            const formattedPrice = `${xahauPrice.toFixed(3)}`;
            updateBadge(formattedPrice);
        })
        .catch(error => {
            console.error('Error fetching XRP price:', error);
            updateBadge('Error');
        });
}

chrome.runtime.onInstalled.addListener(() => {
    fetchxahauPrice();
});

chrome.runtime.onStartup.addListener(() => {
    fetchxahauPrice();
});

chrome.action.onClicked.addListener(() => {
    fetchxahauPrice();
});

chrome.idle.onStateChanged.addListener(state => {
    if (state === 'active') {
        fetchxahauPrice();
    }
});

setInterval(fetchxahauPrice, 300000); //5 Minutes