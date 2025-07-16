import OpenAPI from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT;

app.post("/api", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const message = req.body.coachMessage;

  // console.log("Here is the request message:", message);
  // const gptResponse = await sendMesage(message.message);
  // console.log("Here is gptResponse", gptResponse);
  // console.log("Response: ", gptResponse.output_text);

  const response = {
    sender: "direct report",
    message:
      // gptResponse.output_text ||
      "No response generated from ChatGPT",
  };
  res.json(response);
  console.log("Here is the response: ", response);
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
