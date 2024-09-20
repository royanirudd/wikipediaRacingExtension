chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startGame") {
        startNewGame();
    }
});

function startNewGame() {
    // Open a random Wikipedia page
    chrome.tabs.create({ url: 'https://en.wikipedia.org/wiki/Special:Random' }, function(tab) {
        // TODO: Generate goal page and start tracking
    });
}
