console.log("endgame.js loaded"); // Debug log

document.getElementById('playAgainButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "playAgain"});
    window.close();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in endgame.js:", request); // Debug log
    if (request.action === "gameEnded") {
        document.getElementById('message').textContent = request.message;
    }
});
