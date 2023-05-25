const express = require("express");
const { OpenAIApi, Configuration } = require("openai");

const app = express();
const port = 3000;

const apiKey = "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"; // Замените на ваш действительный API-ключ

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    


    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `ChatGPT: ${userMessage}\n`,
      temperature: 0.6,
      max_tokens: 100,
      n: 1,
      stop: '\n',
    });


    console.log(response);
    let botMessage = response.data.choices[0].text.trim();

    res.json({ botMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
