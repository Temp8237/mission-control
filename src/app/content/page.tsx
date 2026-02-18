'use client';

import { useState, useEffect } from 'react';

type Content = {
  id: string;
  title: string;
  notes: string;
  stage: string;
  createdAt: Date;
};

const stages = ['Ideas', 'Script', 'Thumbnail', 'Filming', 'Published'];

export default function ContentPage() {
  const [content, setContent] = useState<Content[]>([]);
  const [newContent, setNewContent] = useState({ title: '', notes: '', stage: 'Ideas' });

  useEffect(() => {
    const saved = localStorage.getItem('mc-content');
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      setContent([
        { id: '1', title: 'Vibe Coding Tips', stage: 'Ideas', notes: 'Quick tips for beginners', createdAt: new Date() },
        { id: '2', title: 'OpenClaw Tutorial', stage: 'Script', notes: 'Full setup guide', createdAt: new Date() },
        { id: '3', title: 'AI Tools 2026', stage: 'Thumbnail', notes: 'Thumbnail design ideas', createdAt: new Date() },
        { id: '4', title: 'Claude Code Deep Dive', stage: 'Filming', notes: '2 hour video', createdAt: new Date() },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mc-content', JSON.stringify(content));
  }, [content]);

  const addContent = () => {
    if (!newContent.title.trim()) return;
    setContent([...content, { ...newContent, id: Date.now().toString(), createdAt: new Date() }]);
    setNewContent({ title: '', notes: '', stage: 'Ideas' });
  };

  const moveContent = (id: string, direction: 'left' | 'right') => {
    setContent(content.map(c => {
      if (c.id !== id) return c;
      const currentIndex = stages.indexOf(c.stage);
      const newIndex = direction === 'right' 
        ? Math.min(currentIndex + 1, stages.length - 1)
        : Math.max(currentIndex - 1, 0);
      return { ...c, stage: stages[newIndex] };
    }));
  };

  const deleteContent = (id: string) => {
    setContent(content.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Pipeline</h1>
        <span className="text-zinc-500">{content.length} items</span>
      </div>

      {/* Add Content Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Content title..."
            value={newContent.title}
            onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Notes..."
            value={newContent.notes}
            onChange={(e) => setNewContent({ ...newContent, notes: e.target.value })}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          />
          <select
            value={newContent.stage}
            onChange={(e) => setNewContent({ ...newContent, stage: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          >
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={addContent} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            + Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-80">
            <div className="font-semibold mb-4 flex justify-between items-center">
              <span>{stage}</span>
              <span className="text-zinc-500 text-sm">{content.filter(c => c.stage === stage).length}</span>
            </div>
            <div className="space-y-3">
              {content
                .filter((c) => c.stage === stage)
                .map((item) => {
                  const stageIndex = stages.indexOf(stage);
                  return (
                    <div key={item.id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-sm flex-1">{item.title}</div>
                        <button onClick={() => deleteContent(item.id)} className="text-zinc-600 hover:text-red-500">×</button>
                      </div>
                      <div className="text-zinc-500 text-xs mt-1">{item.notes}</div>
                      <div className="mt-3 flex gap-1">
                        {stageIndex > 0 && (
                          <button 
                            onClick={() => moveContent(item.id, 'left')}
                            className="text-xs bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded"
                          >
                            ←
                          </button>
                        )}
                        {stageIndex < stages.length - 1 && (
                          <button 
                            onClick={() => moveContent(item.id, 'right')}
                            className="text-xs bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              {content.filter(c => c.stage === stage).length === 0 && (
                <div className="text-zinc-600 text-sm text-center py-8">No content</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
