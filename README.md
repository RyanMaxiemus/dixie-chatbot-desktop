# Dixie Chatbot Desktop Application

## Overview

This is a desktop chatbot application designed to answer user questions using real-time web data. The bot fetches information directly using the DuckDuckGo Instant Answer API, provides a basic summary of the findings, and responds in a conversational manner. The application is built with Electron.js and is self-contained, running locally without requiring a separate backend server.

## Features

- Electron.js-based desktop application
- Fetches up-to-date answers using the DuckDuckGo Instant Answer API
- Provides basic summarization of search results for a conversational flow
- Runs locally with no need for hosting, cloud storage, or a separate backend

## Tech Stack

- **Frontend & Core Logic:** Electron.js, HTML, CSS, JavaScript
- **Search API:** DuckDuckGo Instant Answer API (used directly, no API key required)
- **Summarization:** Basic placeholder summarization implemented in `src/main.js`. (See "API Integration" section for how a more advanced summarization service like OpenAI GPT could be integrated).

## API Integration

### Search Functionality
The application uses the DuckDuckGo Instant Answer API to fetch information. This API is free to use and does not require an API key for basic queries. The integration is handled directly within `src/main.js`.

### Future Enhancement: Integrating an Advanced Summarization Service
Currently, the application uses a simple placeholder logic to extract key information from the DuckDuckGo results. To enable more advanced summarization (e.g., using OpenAI's GPT models):

1.  **Sign up for an API key** from your chosen summarization service provider (e.g., OpenAI).
2.  **Install the necessary client library** for that service (e.g., `npm install openai`).
3.  **Modify `src/main.js`**:
    *   After fetching results from DuckDuckGo, pass the relevant text to the summarization API.
    *   Replace the placeholder summarization logic with the response from the summarization service.
4.  **Manage your API key securely**:
    *   It is crucial to keep API keys confidential. Do not commit them directly to the repository.
    *   A common practice is to use environment variables. For example, set an environment variable like `OPENAI_API_KEY` in your system.
    *   Access the key in `src/main.js` using `process.env.OPENAI_API_KEY`.
    *   Alternatively, a configuration file (added to `.gitignore`) could be used for local development, but environment variables are generally preferred for flexibility and security.

## Setup & Installation

1.  **Install Node.js & npm**
    If you don't have Node.js and npm installed, download them from [nodejs.org](https://nodejs.org/) or use your system's package manager. For example, on Debian/Ubuntu:
    ```sh
    sudo apt update && sudo apt install nodejs npm -y
    ```
    Verify installation:
    ```sh
    node -v
    npm -v
    ```

2.  **Clone the Repository**
    ```sh
    git clone https://github.com/RyanMaxiemus/dixie-chatbot-desktop.git
    cd dixie-chatbot-desktop
    ```

3.  **Install Dependencies**
    This will install Electron and other necessary packages defined in `package.json`.
    ```sh
    npm install
    ```

4.  **Run the Application**
    ```sh
    npx electron .
    ```

## Contribution

Contributions are welcome! Feel free to fork the repo, submit issues, or open pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
