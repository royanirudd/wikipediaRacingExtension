document.addEventListener('DOMContentLoaded', function() {
    var startGameButton = document.getElementById('startGame');
    startGameButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({action: "startGame"});
    });
});
