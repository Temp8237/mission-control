import { NextRequest, NextResponse } from 'next/server';

const mockData: Record<string, unknown[]> = {
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = (searchParams.get('type') || 'tasks') as keyof typeof mockData;
  
  return NextResponse.json(mockData[type] || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, type, data } = body;

  return NextResponse.json({ success: true, action, type, data });
}
