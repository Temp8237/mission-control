'use client';

import { useState, useEffect } from 'react';

type CalendarEvent = {
  id: string;
  title: string;
  day: number;
  type: 'task' | 'meeting' | 'content' | 'cron';
  description: string;
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mc-events');
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents([
        { id: '1', title: 'Team standup', day: 5, type: 'meeting', description: 'Daily sync' },
        { id: '2', title: 'Deploy v2', day: 12, type: 'task', description: 'Production deployment' },
        { id: '3', title: 'Content review', day: 18, type: 'content', description: 'Weekly review' },
        { id: '4', title: 'Sprint planning', day: 25, type: 'meeting', description: 'Sprint 12' },
        { id: '5', title: 'Backup cron', day: 15, type: 'cron', description: 'Daily backup' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mc-events', JSON.stringify(events));
  }, [events]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => events.filter(e => e.day === day);

  const addEvent = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: 'New Event',
      day: 1,
      type: 'task',
      description: ''
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, field: string, value: any) => {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <button onClick={addEvent} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Event
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <button onClick={prevMonth} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">←</button>
        <span className="text-xl font-semibold px-4">{monthNames[month]} {year}</span>
        <button onClick={nextMonth} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">→</button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-zinc-900 p-3 text-center text-zinc-500 font-medium text-sm">
            {day}
          </div>
        ))}
        {/* Empty cells for days before first of month */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-zinc-950 min-h-24" />
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={day} className="bg-zinc-900 min-h-24 p-2 hover:bg-zinc-800 transition-colors">
              <div className="text-zinc-500 text-sm font-medium">{day}</div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`text-xs mt-1 px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 ${
                    event.type === 'meeting' ? 'bg-blue-900 text-blue-300' :
                    event.type === 'task' ? 'bg-green-900 text-green-300' :
                    event.type === 'content' ? 'bg-purple-900 text-purple-300' :
                    'bg-orange-900 text-orange-300'
                  }`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="font-semibold mb-4">Scheduled Tasks & Events</h2>
        <div className="space-y-2">
          {events.sort((a, b) => a.day - b.day).map(event => (
            <div key={event.id} className="flex items-center gap-3 p-2 bg-zinc-800 rounded-lg">
              <span className="text-zinc-500 w-8">{event.day}</span>
              <input 
                value={event.title}
                onChange={(e) => updateEvent(event.id, 'title', e.target.value)}
                className="flex-1 bg-transparent focus:outline-none"
              />
              <select 
                value={event.type}
                onChange={(e) => updateEvent(event.id, 'type', e.target.value)}
                className="bg-zinc-700 rounded px-2 py-1 text-xs"
              >
                <option value="task">Task</option>
                <option value="meeting">Meeting</option>
                <option value="content">Content</option>
                <option value="cron">Cron</option>
              </select>
              <button onClick={() => deleteEvent(event.id)} className="text-zinc-600 hover:text-red-500">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
