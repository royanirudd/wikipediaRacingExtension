let actionButton = document.getElementById('actionButton');
actionButton.addEventListener('click', handleActionButtonClick);

function handleActionButtonClick() {
    if (actionButton.textContent === 'Start Game') {
        chrome.runtime.sendMessage({action: "startGame"});
    } else if (actionButton.textContent === 'End Game') {
        chrome.runtime.sendMessage({action: "endGame"});
    } else if (actionButton.textContent === 'Play Again') {
        chrome.runtime.sendMessage({action: "startGame"});
    }
}

function updateStatus(message) {
    document.getElementById('gameStatus').textContent = message;
}

function updateTarget(title) {
    document.getElementById('targetArticle').textContent = `Target: ${title}`;
}

function updateClickCount(count) {
    document.getElementById('score').textContent = `Clicks: ${count}`;
}

function updateActionButton(state) {
    if (state === 'start') {
        actionButton.textContent = 'Start Game';
    } else if (state === 'end') {
        actionButton.textContent = 'End Game';
    } else if (state === 'playAgain') {
        actionButton.textContent = 'Play Again';
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateStatus") {
        updateStatus(request.message);
    } else if (request.action === "updateTarget") {
        updateTarget(request.title);
    } else if (request.action === "updateClickCount") {
        updateClickCount(request.count);
    } else if (request.action === "gameStarted") {
        updateActionButton('end');
        updateStatus("Game in progress");
    } else if (request.action === "gameEnded") {
        updateStatus(request.message);
        updateActionButton('playAgain');
    }
});

// Update popup when opened
chrome.runtime.sendMessage({action: "getGameState"}, (response) => {
    if (response.gameActive) {
        updateStatus("Game in progress");
        updateTarget(response.targetTitle);
        updateClickCount(response.clickCount);
        updateActionButton('end');
    } else {
        updateStatus("No active game");
        updateActionButton('start');
    }
});
