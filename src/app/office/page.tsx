'use client';

import { useState, useEffect } from 'react';

type Workspace = {
  id: string;
  agent: string;
  status: 'working' | 'idle';
  task: string;
  x: number;
  y: number;
  emoji: string;
};

export default function OfficePage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mc-office');
    if (saved) {
      setWorkspaces(JSON.parse(saved));
    } else {
      setWorkspaces([
        { id: '1', agent: 'Harry', status: 'working', task: 'Reading messages', x: 1, y: 1, emoji: '👽' },
        { id: '2', agent: 'Dev Agent', status: 'idle', task: 'Waiting...', x: 2, y: 1, emoji: '💻' },
        { id: '3', agent: 'Writer Agent', status: 'working', task: 'Drafting content', x: 1, y: 2, emoji: '✍️' },
        { id: '4', agent: 'Designer Agent', status: 'idle', task: 'Waiting...', x: 2, y: 2, emoji: '🎨' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mc-office', JSON.stringify(workspaces));
  }, [workspaces]);

  const updateWorkspace = (id: string, field: string, value: string) => {
    setWorkspaces(workspaces.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const workingCount = workspaces.filter(w => w.status === 'working').length;
  const idleCount = workspaces.filter(w => w.status === 'idle').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Office</h1>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 text-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {workingCount} Working
          </span>
          <span className="flex items-center gap-2 text-zinc-500">
            <span className="w-2 h-2 bg-zinc-500 rounded-full"></span>
            {idleCount} Idle
          </span>
        </div>
      </div>

      {/* Office Grid */}
      <div className="grid grid-cols-2 gap-6">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden min-h-48"
          >
            <div className="absolute top-4 right-4">
              <select
                value={ws.status}
                onChange={(e) => updateWorkspace(ws.id, 'status', e.target.value)}
                className={`text-xs px-3 py-1 rounded-full cursor-pointer ${
                  ws.status === 'working'
                    ? 'bg-green-900 text-green-300'
                    : 'bg-zinc-700 text-zinc-400'
                }`}
              >
                <option value="working">Working</option>
                <option value="idle">Idle</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-6xl">{ws.emoji}</div>
              <div>
                <input
                  value={ws.agent}
                  onChange={(e) => updateWorkspace(ws.id, 'agent', e.target.value)}
                  className="bg-transparent font-semibold text-lg focus:outline-none"
                />
                <input
                  value={ws.task}
                  onChange={(e) => updateWorkspace(ws.id, 'task', e.target.value)}
                  className="bg-transparent text-zinc-500 text-sm w-full focus:outline-none"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-xs text-zinc-600 mb-1">
                <span>Productivity</span>
                <span>{ws.status === 'working' ? '70%' : '5%'}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    ws.status === 'working' ? 'bg-green-600' : 'bg-zinc-600'
                  }`}
                  style={{ width: ws.status === 'working' ? '70%' : '5%' }}
                />
              </div>
            </div>

            {/* Animated elements when working */}
            {ws.status === 'working' && (
              <div className="absolute bottom-2 right-2 text-xs text-zinc-600 animate-pulse">
                ⚡ {ws.status}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Office Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">👽</div>
          <div className="text-sm text-zinc-500">Main Agent</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">💻</div>
          <div className="text-sm text-zinc-500">Dev</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">✍️</div>
          <div className="text-sm text-zinc-500">Writer</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">🎨</div>
          <div className="text-sm text-zinc-500">Designer</div>
        </div>
      </div>
    </div>
  );
}
