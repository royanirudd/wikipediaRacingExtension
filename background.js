let gameActive = false;
let startTime;
let clickCount = 0;
let targetUrl = '';
let targetTitle = '';
let gameTabId = null;

function startGame() {
    gameActive = true;
    startTime = Date.now();
    clickCount = 0;
    generateTargetArticle();
    
    chrome.tabs.create({url: 'https://en.wikipedia.org/wiki/Special:Random'}, (tab) => {
        gameTabId = tab.id;
    });
    
    updateStorage();
}

function endGame(won = false) {
    gameActive = false;
    let endTime = Date.now();
    let duration = (endTime - startTime) / 1000; // in seconds
    let message = won ? 
        `Victory! You've reached ${targetTitle}. Time: ${duration.toFixed(2)}s, Clicks: ${clickCount}` :
        `Game ended. Time: ${duration.toFixed(2)}s, Clicks: ${clickCount}`;
    
    chrome.runtime.sendMessage({action: "updateStatus", message: message});
    updateStorage();
}

function generateTargetArticle() {
    fetch('https://en.wikipedia.org/wiki/Special:Random')
        .then(response => {
            targetUrl = response.url;
            return response.text();
        })
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            targetTitle = doc.querySelector('h1#firstHeading').textContent;
            chrome.runtime.sendMessage({action: "updateTarget", title: targetTitle});
            updateStorage();
        });
}

function updateStorage() {
    chrome.storage.local.set({
        gameActive: gameActive,
        startTime: startTime,
        clickCount: clickCount,
        targetUrl: targetUrl,
        targetTitle: targetTitle,
        gameTabId: gameTabId
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startGame") {
        startGame();
    } else if (request.action === "endGame") {
        endGame();
    } else if (request.action === "getGameState") {
        sendResponse({
            gameActive: gameActive,
            clickCount: clickCount,
            targetTitle: targetTitle
        });
    }
});

chrome.webNavigation.onCompleted.addListener((details) => {
    if (gameActive && details.tabId === gameTabId) {
        clickCount++;
        updateStorage();
        chrome.runtime.sendMessage({action: "updateClickCount", count: clickCount});
        
        if (details.url === targetUrl) {
            endGame(true);
        }
    }
}, {url: [{hostSuffix: 'wikipedia.org'}]});

chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === gameTabId) {
        endGame();
    }
});
