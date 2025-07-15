import OpenAPI from "openai";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const openai = new OpenAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT;

let message_history = [];

app.get("/coaching_api", async (req, res) => {
  const message = req.body;
  console.log("Here is the request message:", message);

  const gptResponse = await sendMesage(message);
  console.log("Here is your response", gptResponse);
  res.json({ response: gptResponse || "No response generated from ChatGPT" });
});

app.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});

async function sendMesage(text) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: text,
    store: true,
  });

  return response;
}
