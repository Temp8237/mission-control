import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', emoji: '🎯' },
  { href: '/tasks', label: 'Tasks', emoji: '📋' },
  { href: '/content', label: 'Content', emoji: '🎬' },
  { href: '/calendar', label: 'Calendar', emoji: '📅' },
  { href: '/memory', label: 'Memory', emoji: '🧠' },
  { href: '/team', label: 'Team', emoji: '👥' },
  { href: '/office', label: 'Office', emoji: '🏢' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Mission Control</h1>
        <p className="text-zinc-500 text-sm">OpenClaw Dashboard</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
