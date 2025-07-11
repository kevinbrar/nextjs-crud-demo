// pages/index.js
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">RAG App Demo</h1>
      <input
        className="w-full max-w-md border p-2 rounded mb-4"
        type="text"
        placeholder="Ask a question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {answer && (
        <div className="w-full max-w-md bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
