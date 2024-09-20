document.getElementById('startGame').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "startGame"});
});

document.getElementById('endGame').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "endGame"});
});

function updateStatus(message) {
    document.getElementById('gameStatus').textContent = message;
}

function updateTarget(title) {
    document.getElementById('targetArticle').textContent = `Target: ${title}`;
}

function updateClickCount(count) {
    document.getElementById('score').textContent = `Clicks: ${count}`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateStatus") {
        updateStatus(request.message);
    } else if (request.action === "updateTarget") {
        updateTarget(request.title);
    } else if (request.action === "updateClickCount") {
        updateClickCount(request.count);
    }
});

// Update popup when opened
chrome.runtime.sendMessage({action: "getGameState"}, (response) => {
    if (response.gameActive) {
        updateStatus("Game in progress");
        updateTarget(response.targetTitle);
        updateClickCount(response.clickCount);
    } else {
        updateStatus("No active game");
    }
});
