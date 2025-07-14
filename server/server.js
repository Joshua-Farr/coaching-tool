import OpenAPI from "openai";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const openai = new OpenAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT;

app.get("/api", async (req, res) => {
  //   res.json({ reponse: response.output_text });
  const gptResponse = await main("Write a one sentence story about a unicorn.");
  console.log("Here is your response", gptResponse);
  res.json({ response: gptResponse || "No response generated from ChatGPT" });
});

app.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});

async function main(text) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: text,
    store: true,
  });

  return response;
}
