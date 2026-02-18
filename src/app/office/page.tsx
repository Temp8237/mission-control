'use client';

const workspaces = [
  { id: '1', agent: 'Harry', status: 'working', task: 'Reading messages', x: 1, y: 1 },
  { id: '2', agent: 'Dev Agent', status: 'idle', task: 'Waiting...', x: 2, y: 1 },
  { id: '3', agent: 'Writer Agent', status: 'working', task: 'Drafting content', x: 1, y: 2 },
  { id: '4', agent: 'Designer Agent', status: 'idle', task: 'Waiting...', x: 2, y: 2 },
];

export default function OfficePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Office</h1>

      <div className="grid grid-cols-2 gap-6">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <span
                className={`w-3 h-3 rounded-full block ${
                  ws.status === 'working' ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'
                }`}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl">🖥️</div>
              <div>
                <div className="font-semibold text-lg">{ws.agent}</div>
                <div className="text-zinc-500 text-sm">{ws.task}</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  ws.status === 'working' ? 'bg-green-600 animate-pulse' : 'bg-zinc-600'
                }`}
                style={{ width: ws.status === 'working' ? '70%' : '10%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="font-semibold mb-4">Office Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">2</div>
            <div className="text-zinc-500 text-sm">Working</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-500">2</div>
            <div className="text-zinc-500 text-sm">Idle</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-zinc-500 text-sm">Total Agents</div>
          </div>
        </div>
      </div>
    </div>
  );
}
