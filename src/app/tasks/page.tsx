'use client';

import { useState, useEffect } from 'react';

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: 'me' | 'you';
  createdAt: Date;
};

type Column = {
  id: string;
  title: string;
};

const columns: Column[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: 'me' as 'me' | 'you' });
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mc-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([
        { id: '1', title: 'Build API endpoint', description: 'Create user API', assignee: 'me', createdAt: new Date() },
        { id: '2', title: 'Design dashboard', description: 'Figma mockups', assignee: 'you', createdAt: new Date() },
        { id: '3', title: 'Set up database', description: 'Convex schema', assignee: 'you', createdAt: new Date() },
        { id: '4', title: 'Project setup', description: 'NextJS + Tailwind', assignee: 'you', createdAt: new Date() },
        { id: '5', title: 'Auth setup', description: 'OAuth flow', assignee: 'me', createdAt: new Date() },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mc-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([...tasks, { ...newTask, id: Date.now().toString(), createdAt: new Date() }]);
    setNewTask({ title: '', description: '', assignee: 'me' });
  };

  const moveTask = (taskId: string, newStatus: string) => {
    // For now just delete completed tasks
    if (newStatus === 'done') {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getTasksByStatus = (status: string) => {
    if (status === 'todo') return tasks.filter(t => t.assignee === 'me');
    if (status === 'in-progress') return tasks.filter(t => t.assignee === 'you');
    return [];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks Board</h1>
        <span className="text-zinc-500">{tasks.length} tasks</span>
      </div>

      {/* Add Task Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Task title..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Description..."
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          />
          <select
            value={newTask.assignee}
            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value as 'me' | 'you' })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          >
            <option value="me">👤 Me</option>
            <option value="you">🤖 Harry</option>
          </select>
          <button onClick={addTask} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            + Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{column.title}</h2>
              <span className="text-zinc-500 text-sm">{getTasksByStatus(column.id).length}</span>
            </div>
            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => setDraggedTask(task.id)}
                  onDragEnd={() => {
                    if (column.id === 'done' && draggedTask) {
                      moveTask(draggedTask, 'done');
                    }
                    setDraggedTask(null);
                  }}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:border-zinc-500 cursor-grab transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{task.title}</div>
                    <button onClick={() => deleteTask(task.id)} className="text-zinc-600 hover:text-red-500">×</button>
                  </div>
                  <div className="text-zinc-500 text-sm mt-1">{task.description}</div>
                  <div className="mt-3 flex justify-between items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.assignee === 'me'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-purple-900 text-purple-300'
                      }`}
                    >
                      {task.assignee === 'me' ? '👤 Me' : '🤖 Harry'}
                    </span>
                    {column.id !== 'done' && (
                      <span className="text-xs text-zinc-600">Drag to done →</span>
                    )}
                  </div>
                </div>
              ))}
              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-zinc-600 text-sm text-center py-8">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
