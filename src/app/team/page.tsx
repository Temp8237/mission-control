'use client';

const team = [
  { id: '1', name: 'Brayden', role: 'Owner', status: 'active', emoji: '👤' },
  { id: '2', name: 'Harry', role: 'Main Agent', status: 'active', emoji: '👽' },
  { id: '3', name: 'Dev Agent', role: 'Developer', status: 'idle', emoji: '💻' },
  { id: '4', name: 'Writer Agent', role: 'Writer', status: 'idle', emoji: '✍️' },
  { id: '5', name: 'Designer Agent', role: 'Designer', status: 'idle', emoji: '🎨' },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Agent
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4"
          >
            <div className="text-4xl">{member.emoji}</div>
            <div className="flex-1">
              <div className="font-semibold">{member.name}</div>
              <div className="text-zinc-500 text-sm">{member.role}</div>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  member.status === 'active'
                    ? 'bg-green-900 text-green-300'
                    : 'bg-zinc-700 text-zinc-400'
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
