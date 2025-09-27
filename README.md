# AISQLgenerator

✨ AI Text-to-SQL Query Generator – convert natural language questions into SQL queries using AI.

---

## Demo

[AIAPP](https://aisqlgenerator.netlify.app)

---

## Features

- Convert plain English questions into valid SQL queries.
- Syntax-highlighted SQL output.
- Automatically logs query history with numbered questions in `query_history.txt`.
- Copy SQL to clipboard easily.
- Clean and interactive UI.

---

## Project Structure

AISQLgenerator/
├─ public/
│ └─ index.html ← Frontend (HTML/CSS/JS combined)
├─ .env ← Your OpenRouter API key
├─ package.json
├─ package-lock.json
├─ router.js ← Express backend server
└─ query_history.txt ← Logged queries (auto-generated)

yaml
Copy code

---

## Requirements

- Node.js >= 18
- npm
- OpenRouter API Key

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/AI_Text-to-SQL-Query.git
cd AI_Text-to-SQL-Query
```
Install dependencies:

```bash

npm install
```
Create a .env file in the root directory:

```env
OPEN_ROUTER_API_KEY=your_openrouter_api_key_here
⚠ Make sure no spaces around = and no quotes.
```
Start the server:

```bash
npm start
```
Open your browser and visit:

```arduino
http://localhost:3000
```
Usage
Enter your natural language query in the textarea.

Click Generate SQL.

The SQL query will appear below with syntax highlighting.

Copy SQL using your browser or add a “Copy SQL” button in the UI.

All queries are logged to query_history.txt in numbered order.

Deployment Notes
Frontend on Netlify: Place index.html and assets in public/. Use public/ as the publish directory.

Backend (Express server): Deploy on Node-friendly hosts such as Render, Railway, or Heroku.

Environment Variables: Always use .env to store API keys. Do not commit .env to Git.

.gitignore Example
bash
Copy code
node_modules/
.env
query_history.txt
Dependencies
express

axios

body-parser

dotenv
