'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [taskCount, setTaskCount] = useState(0);
  const [memoryCount, setMemoryCount] = useState(0);
  const [teamCount] = useState(5);
  const [recentActivity, setRecentActivity] = useState<{time: string, action: string}[]>([]);

  useEffect(() => {
    // Load real data
    const tasks = localStorage.getItem('mc-tasks');
    if (tasks) setTaskCount(JSON.parse(tasks).length);
    
    const memories = localStorage.getItem('mc-memories');
    if (memories) setMemoryCount(JSON.parse(memories).length);

    // Default activity
    setRecentActivity([
      { time: 'Just now', action: 'Viewed Mission Control' },
      { time: 'Today', action: 'Built Mission Control dashboard' },
      { time: 'Today', action: 'Set up Claude Code integration' },
    ]);
  }, []);

  const stats = [
    { label: 'Tasks', value: taskCount, emoji: '📋', href: '/tasks' },
    { label: 'Content', value: 5, emoji: '🎬', href: '/content' },
    { label: 'Team', value: teamCount, emoji: '👥', href: '/team' },
    { label: 'Memories', value: memoryCount, emoji: '🧠', href: '/memory' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Mission Control</h1>
        <p className="text-zinc-500 mt-2">Your OpenClaw dashboard</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href || '#'}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 cursor-pointer transition-colors">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-zinc-500 text-sm">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/tasks" className="block p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
              + Add new task
            </Link>
            <Link href="/content" className="block p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
              + Add content idea
            </Link>
            <Link href="/memory" className="block p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
              + Create memory
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-zinc-400">{activity.action}</span>
                <span className="text-zinc-600">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">🎯 Active Agent: Harry</h2>
        <p className="text-zinc-300">Ready to help. Ask me anything or tell me what to build.</p>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs">● Online</span>
          <span className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">Sonnet 4.6</span>
        </div>
      </div>
    </div>
  );
}
