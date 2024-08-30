# Reading Assistant Chrome Extension

A Chrome extension designed to enhance your reading experience with features like text summarization, reading time estimation, text highlighting, text-to-speech, and a focused reading mode.

## Features

- **Text Summarization:** Provides concise summaries of web pages.
- **Reading Time Estimation:** Estimates the time required to read a web page.
- **Text Highlighting:** Allows users to highlight text on any web page.
- **Text-to-Speech:** Reads the web page content aloud.
- **Stop Text-to-Speech:** Stops the ongoing text-to-speech when needed.
- **Reading Mode:** Removes distractions and formats the web page for easier reading.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/reading-assistant-extension.git
   ```
2. **Navigate to Chrome Extensions:** Open Chrome and go to chrome://extensions/.

3. **Enable Developer Mode:** Toggle the switch in the top right corner to enable Developer Mode.

4. **Load the Extension:** Click "Load unpacked" and select the src folder from the cloned repository.


## Usage

- Click on the Reading Assistant icon in the Chrome toolbar.
- Use the buttons in the popup to interact with the features:
  - **Summarize Text:** Generates a summary of the current webpage.
  - **Estimated Reading Time:** Calculates and displays the estimated reading time for the webpage.
  - **Highlight Text:** Highlights the selected text on the current webpage.
  - **Read Aloud:** Reads the content of the webpage aloud using text-to-speech.
  - **Stop Read Aloud:** Stops the ongoing text-to-speech.
  - **Activate Reading Mode:** Removes distractions and formats the page for easier reading.

## Project Structure
```
reading-assistant-extension/
│
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
├── icons/
│   └── icon.png
└── README.md

```


- **`manifest.json`**: Configuration file for the Chrome extension.
- **`popup.html`**: HTML file for the extension's popup interface.
- **`popup.js`**: JavaScript file containing the logic for the extension.
- **`styles.css`**: Stylesheet for the extension's popup.
- **`icons/`**: Folder containing icons for the extension.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
