// pages/index.js
import React, { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setItems([...items, input]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Next.js CRUD App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an item"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className="w-full max-w-md">
        {items.map((item, index) => (
          <li key={index} className="bg-white p-2 rounded shadow mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
