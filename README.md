# wikipediaRacingExtension

## Description

Single Player Wikigame is a Chrome extension that allows users to play the Wikipedia game solo. The goal is to navigate from a random Wikipedia article to a target article using only the links within Wikipedia pages. This extension tracks your progress, counts your clicks, and times your gameplay.

<details>
<summary>Installation</summary>

1. Clone this repository or download the ZIP file and extract it.
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
</details>

<details>
<summary>Features</summary>

- Automatically generates a random target Wikipedia article
- Tracks the number of clicks (page navigations)
- Measures the time taken to reach the target article
- Provides a simple user interface to start and end games
</details>

<details>
<summary>How to Play</summary>

1. Click on the extension icon in your Chrome browser.
2. Click the "Start Game" button in the popup.
3. A new tab will open with a random Wikipedia article.
4. The extension popup will show your target article.
5. Navigate through Wikipedia using only the links on the pages.
6. Try to reach the target article in the fewest clicks and shortest time possible.
7. The game ends when you reach the target article or close the game tab.
</details>

## TODO

- Track breadcrumbs through pages visited
- Add anti-cheat with no Wikipedia searching allowed
- Add hints, perhaps showing sites that are less than 3 clicks away
- Keep a running cache so that from any page it is possible to say how many clicks away the target page is
- Improve styling (CSS)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any problems or have any suggestions, please open an issue in this repository.

## Credits

Created by Anirudh Roy

Enjoy playing the Single Player Wikigame!
