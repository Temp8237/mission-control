'use client';

import { useState, useEffect } from 'react';

type Agent = {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'working';
  emoji: string;
  description: string;
};

export default function TeamPage() {
  const [team, setTeam] = useState<Agent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mc-team');
    if (saved) {
      setTeam(JSON.parse(saved));
    } else {
      setTeam([
        { id: '1', name: 'Brayden', role: 'Owner', status: 'active', emoji: '👤', description: 'You - the boss' },
        { id: '2', name: 'Harry', role: 'Main Agent', status: 'active', emoji: '👽', description: 'Your AI assistant' },
        { id: '3', name: 'Dev Agent', role: 'Developer', status: 'idle', emoji: '💻', description: 'Code writing specialist' },
        { id: '4', name: 'Writer Agent', role: 'Writer', status: 'idle', emoji: '✍️', description: 'Content creation' },
        { id: '5', name: 'Designer Agent', role: 'Designer', status: 'idle', emoji: '🎨', description: 'UI/Visual design' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mc-team', JSON.stringify(team));
  }, [team]);

  const addAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: 'New Agent',
      role: 'Developer',
      status: 'idle',
      emoji: '🤖',
      description: 'Description...'
    };
    setTeam([...team, newAgent]);
  };

  const updateAgent = (id: string, field: keyof Agent, value: string) => {
    setTeam(team.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const deleteAgent = (id: string) => {
    setTeam(team.filter(a => a.id !== id));
  };

  const roles = [...new Set(team.map(t => t.role))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team</h1>
        <button onClick={addAgent} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Agent
        </button>
      </div>

      {/* Role Groups */}
      {roles.map(role => (
        <div key={role} className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-400">{role}s</h2>
          <div className="grid grid-cols-2 gap-4">
            {team.filter(t => t.role === role).map((member) => (
              <div key={member.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
                <div className="text-4xl">{member.emoji}</div>
                <div className="flex-1">
                  <input
                    value={member.name}
                    onChange={(e) => updateAgent(member.id, 'name', e.target.value)}
                    className="bg-transparent font-semibold focus:outline-none w-full"
                  />
                  <input
                    value={member.description}
                    onChange={(e) => updateAgent(member.id, 'description', e.target.value)}
                    className="bg-transparent text-zinc-500 text-sm w-full focus:outline-none"
                  />
                  <div className="mt-2 flex gap-2">
                    <select
                      value={member.status}
                      onChange={(e) => updateAgent(member.id, 'status', e.target.value)}
                      className={`text-xs px-2 py-1 rounded ${
                        member.status === 'active' ? 'bg-green-900 text-green-300' :
                        member.status === 'working' ? 'bg-blue-900 text-blue-300' :
                        'bg-zinc-700 text-zinc-400'
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="working">Working</option>
                      <option value="idle">Idle</option>
                    </select>
                    <input
                      value={member.emoji}
                      onChange={(e) => updateAgent(member.id, 'emoji', e.target.value)}
                      className="w-8 bg-zinc-800 rounded text-center text-sm"
                    />
                  </div>
                </div>
                <button onClick={() => deleteAgent(member.id)} className="text-zinc-600 hover:text-red-500">×</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{team.filter(t => t.status === 'active' || t.status === 'working').length}</div>
          <div className="text-zinc-500 text-sm">Active</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-zinc-500">{team.filter(t => t.status === 'idle').length}</div>
          <div className="text-zinc-500 text-sm">Idle</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold">{team.length}</div>
          <div className="text-zinc-500 text-sm">Total</div>
        </div>
      </div>
    </div>
  );
}
