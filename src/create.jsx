import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Search from './components/Search';

export default function Clock() {
 
  const [searchItem, setSearchItem] = useState('');
  const [filters, setFilters] = useState('all');
  const [storesearch, setStoresearch] = useState([]);

  const addlist = (e) => {
    if (e.key === 'Enter' && searchItem.trim()) {
      setTimeout(() => {
        setStoresearch(storesearch.concat({ id: Date.now(), text: searchItem.trim(), completed: false }));
        setSearchItem('');
      }, 100);
    }
  };

  const filtersearch = storesearch.filter((store) => {
    if (filters === 'active') return !store.completed;
    if (filters === 'completed') return store.completed;
    return true;
  });

  const deleteitem = () => {
    setStoresearch((storesearch) => storesearch.filter((store) => !store.completed));
  };

  const clearall = () => {
    setStoresearch([]);
  };

  const itemscount =
    filters === 'all'
      ? storesearch.length
      : filters === 'active'
      ? storesearch.filter((store) => !store.completed).length
      : storesearch.filter((store) => store.completed).length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">Todos</h1>

      
      <div className="mb-4">
        
        <Search searchItem={searchItem} setSearchItem={setSearchItem} addlist={addlist} />
      </div>

      <ul className="space-y-2 mb-4">
        {filtersearch.map((store) => (
          <li key={store.id} className="flex items-center bg-gray-100 p-2 rounded shadow-sm">
            <input
              type="checkbox"
              checked={store.completed}
              onChange={() => {
                const updated = storesearch.map((item) =>
                  item.id === store.id ? { ...item, completed: !item.completed } : item
                );
                setStoresearch(updated);
              }}
              className="mr-3"
            />
            <span className={store.completed ? 'line-through text-gray-500' : ''}>{store.text}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center text-sm mb-3">
        <span className="text-gray-700">
          {filters === 'all'
            ? `${itemscount} total items`
            : filters === 'active'
            ? `${itemscount} active items`
            : `${itemscount} completed items`}
        </span>
        <button onClick={clearall} className="text-red-500 hover:underline">
          Clear All
        </button>
      </div>

      <div className="flex justify-between space-x-2">
        <button
          onClick={() => setFilters('all')}
          className={`flex-1 py-1 rounded ${filters === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilters('active')}
          className={`flex-1 py-1 rounded ${filters === 'active' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilters('completed')}
          className={`flex-1 py-1 rounded ${filters === 'completed' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
        <button onClick={deleteitem} className="flex-1 bg-red-500 text-white py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}



const root = createRoot(document.getElementById('root'))
root.render(<Clock />);