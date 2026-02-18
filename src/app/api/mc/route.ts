import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'tasks';
  
  // In production, this would read from Convex/DB
  // For now, return mock data - user can connect their own DB
  const data = {
    tasks: [
      { id: '1', title: 'Build API endpoint', description: 'Create user API', assignee: 'me' },
      { id: '2', title: 'Design dashboard', description: 'Figma mockups', assignee: 'you' },
    ],
    content: [
      { id: '1', title: 'Vibe Coding Tips', stage: 'Ideas', notes: 'Quick tips for beginners' },
    ],
    memories: [
      { id: '1', title: 'Session Notes', content: 'Set up OpenClaw...', date: 'Today' },
    ],
  };

  return NextResponse.json(data[type] || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, type, data } = body;

  // Handle CRUD operations
  // In production, this would write to Convex/DB
  
  return NextResponse.json({ success: true, action, type, data });
}
