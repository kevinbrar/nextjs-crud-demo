// pages/api/ask.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body || {};

  if (!query) {
    return res.status(400).json({ error: 'Missing query in request body' });
  }

  // (the rest of your existing code follows)

  const { query } = req.body;

  // Fake doc context (in real RAG, you'd retrieve from a vector store)
  const context = "RAG stands for Retrieval-Augmented Generation. It's used to improve LLM outputs with external info.";

  const prompt = `Use the following context to answer the question:\n\nContext: ${context}\n\nQuestion: ${query}`;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.status(200).json({ answer: data.choices?.[0]?.text.trim() || "No answer." });
  } catch (err) {
    res.status(500).json({ answer: "Failed to contact LLM." });
  }
}
