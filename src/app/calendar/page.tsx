'use client';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const events = [
  { day: 5, title: 'Team standup', type: 'meeting' },
  { day: 12, title: 'Deploy v2', type: 'task' },
  { day: 18, title: 'Content review', type: 'content' },
  { day: 25, title: 'Sprint planning', type: 'meeting' },
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">← Prev</button>
          <span className="px-4 py-2">February 2026</span>
          <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">Next →</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-zinc-900 p-3 text-center text-zinc-500 font-medium">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((e) => e.day === day);
          return (
            <div key={day} className="bg-zinc-900 min-h-24 p-2">
              <div className="text-zinc-500 text-sm">{day}</div>
              {dayEvents.map((event, i) => (
                <div
                  key={i}
                  className={`text-xs mt-1 px-1 py-0.5 rounded truncate ${
                    event.type === 'meeting'
                      ? 'bg-blue-900 text-blue-300'
                      : event.type === 'task'
                      ? 'bg-green-900 text-green-300'
                      : 'bg-purple-900 text-purple-300'
                  }`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
