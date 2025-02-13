# Dixie Chatbot Desktop Application

## Overview

This is a desktop chatbot application designed to answer user questions using real-time web data. The bot fetches information from the web, summarizes the results, and responds in a conversational manner.

## Features

- Electron.js-based desktop application
- Fetches up-to-date answers using web search APIs
- Summarizes responses for a natural conversation flow
- Runs locally with no need for hosting or cloud storage

## Tech Stack

- **Frontend:** Electron.js, HTML, CSS, JavaScript
- **Backend:** Node.js (Express.js)
- **Search API:** Bing Search API (or DuckDuckGo API as a free alternative)
- **Summarization AI:** GPT-3.5 API (OpenAI) or open-source models (T5, BART)
- **Local Storage:** JSON or SQLite (if needed)

## Setup & Installation

1. **Install Node.js & npm**

   ```sh
   sudo apt update && sudo apt install nodejs npm -y
   ```

   Verify installation:

   ```sh
   node -v
   npm -v
   ```

2. **Clone the Repository**

   ```sh
   git clone https://github.com/RyanMaxiemus/dixie-chatbot-desktop.git
   cd dixie-chatbot-desktop
   ```

3. **Install Dependencies**

   ```sh
   npm install
   ```

4. **Run the Application**

   ```sh
   npx electron .
   ```

## Contribution

Contributions are welcome! Feel free to fork the repo, submit issues, or open pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
