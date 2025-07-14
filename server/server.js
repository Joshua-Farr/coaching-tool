import OpenAPI from "openai";

const express = require("express");
const openai = new OpenAPI();
const PORT = 8080;

const app = express();

app.get("/api", (req, res) => {
  const response = await openai.responses.create(
    {
        model: "gpt-4o-mini",
        input: req.body,
        store: true,
    }
  )

  res.json({ reponse: response.output_text });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
