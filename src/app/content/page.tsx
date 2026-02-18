'use client';

const stages = ['Ideas', 'Script', 'Thumbnail', 'Filming', 'Published'];

const initialContent = [
  { id: '1', title: 'Vibe Coding Tips', stage: 'Ideas', notes: 'Quick tips for beginners' },
  { id: '2', title: 'OpenClaw Tutorial', stage: 'Script', notes: 'Full setup guide' },
  { id: '3', title: 'AI Tools 2026', stage: 'Thumbnail', notes: 'Thumbnail design ideas' },
  { id: '4', title: 'Claude Code Deep Dive', stage: 'Filming', notes: '2 hour video' },
];

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Pipeline</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Content
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="font-semibold mb-4">{stage}</div>
            <div className="space-y-3">
              {initialContent
                .filter((c) => c.stage === stage)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 cursor-pointer hover:border-zinc-600"
                  >
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-zinc-500 text-xs mt-1">{item.notes}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
