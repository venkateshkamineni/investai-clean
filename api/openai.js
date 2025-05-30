import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure you set this in Vercel environment variables
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.data.choices[0].message.content;

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
}
