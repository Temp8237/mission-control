'use client';

import { useState, useEffect } from 'react';

type Memory = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [search, setSearch] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    // Load from localStorage first (includes runtime updates)
    const saved = localStorage.getItem('mc-memories');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMemories(parsed);
      if (parsed.length > 0) setSelectedMemory(parsed[0]);
    } else {
      // Default memories
      const defaultMemories: Memory[] = [
        { id: '1', title: 'Session 2026-02-18', content: 'Set up OpenClaw with Minimax. Chose name Harry. Configured Brave Search, GitHub CLI.', date: 'Today' },
        { id: '2', title: 'Project Ideas', content: 'Mission Control, Content Pipeline, Team management. Built NextJS app with 6 modules.', date: 'Today' },
        { id: '3', title: 'Tools Configured', content: 'Web search (Brave), GitHub (gh CLI), WhatsApp, Coding agents (Claude Code).', date: 'Today' },
      ];
      setMemories(defaultMemories);
      setSelectedMemory(defaultMemories[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mc-memories', JSON.stringify(memories));
  }, [memories]);

  const filteredMemories = memories.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.content.toLowerCase().includes(search.toLowerCase())
  );

  const addMemory = () => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: 'New Memory',
      content: 'Click to edit...',
      date: 'Just now'
    };
    setMemories([newMemory, ...memories]);
    setSelectedMemory(newMemory);
  };

  const updateMemory = (id: string, title: string, content: string) => {
    setMemories(memories.map(m => m.id === id ? { ...m, title, content } : m));
    if (selectedMemory?.id === id) {
      setSelectedMemory({ ...selectedMemory, title, content });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Memory</h1>
        <button onClick={addMemory} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + New Memory
        </button>
      </div>

      <input
        type="text"
        placeholder="Search memories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Memory List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              className={`p-4 rounded-xl cursor-pointer transition-colors ${
                selectedMemory?.id === memory.id
                  ? 'bg-zinc-800 border border-zinc-600'
                  : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-600'
              }`}
            >
              <div className="font-medium">{memory.title}</div>
              <div className="text-zinc-500 text-sm mt-1 line-clamp-2">{memory.content}</div>
              <div className="text-zinc-600 text-xs mt-2">{memory.date}</div>
            </div>
          ))}
        </div>

        {/* Memory Detail */}
        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          {selectedMemory ? (
            <div className="space-y-4">
              <input
                type="text"
                value={selectedMemory.title}
                onChange={(e) => updateMemory(selectedMemory.id, e.target.value, selectedMemory.content)}
                className="w-full bg-transparent text-xl font-bold border-b border-zinc-700 pb-2 focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={selectedMemory.content}
                onChange={(e) => updateMemory(selectedMemory.id, selectedMemory.title, e.target.value)}
                className="w-full h-96 bg-transparent resize-none focus:outline-none text-zinc-300"
              />
              <div className="text-zinc-600 text-sm">{selectedMemory.date}</div>
            </div>
          ) : (
            <div className="text-center text-zinc-500 py-20">Select a memory to view</div>
          )}
        </div>
      </div>
    </div>
  );
}
