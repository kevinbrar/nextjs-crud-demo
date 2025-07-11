// pages/index.js
import React, { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAdd = () => {
    if (input.trim() === '') return;

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = input;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, input]);
    }
    setInput('');
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setInput(items[index]);
    setEditingIndex(index);
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
          placeholder={editingIndex !== null ? 'Edit item' : 'Add an item'}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="w-full max-w-md">
        {items.map((item, index) => (
          <li key={index} className="bg-white p-2 rounded shadow mb-2 flex justify-between items-center">
            <span>{item}</span>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:underline" onClick={() => handleEdit(index)}>Edit</button>
              <button className="text-red-500 hover:underline" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
