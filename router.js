import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";  
dotenv.config();
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;
const messages = [
  {
    role: "system",
    content: `
You are an AI assistant that converts natural language requests into SQL queries.  
Rules:  
- Respond only with valid SQL inside a code block (\`\`\`sql ... \`\`\`).  
- Do not explain or add text outside SQL.  
- Assume user understands SQL.  
`,
  },
];
app.post("/sql", async (req, res) => {
  try {
    const userInput = req.body.query;
    if (!userInput) {
      return res.status(400).json({ error: "Query text is required" });
    }
    messages.push({ role: "user", content: userInput });
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
        },
      }
    );
    const reply = response.data.choices[0].message.content;
    messages.push({ role: "assistant", content: reply });
    const historyFile = path.join(__dirname, "query_history.txt");

    let questionNumber = 1;
    if (fs.existsSync(historyFile)) {
      const content = fs.readFileSync(historyFile, "utf8");
      const matches = content.match(/Question (\d+):/g);
      if (matches) {
        questionNumber = matches.length + 1;
      }
    }
    const logEntry = `Question ${questionNumber}: ${userInput}\nSQL ${questionNumber}: ${reply}\n\n`;
    fs.appendFileSync(historyFile, logEntry, "utf8");
    res.json({ sql: reply });
  } catch (error) {
    res.status(500).json({
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
