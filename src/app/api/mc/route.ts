import { NextRequest, NextResponse } from 'next/server';

// Simple file-based sync via environment variable or just return current state
// In production, replace with Convex/Supabase

const MISSION_CONTROL_URL = process.env.MISSION_CONTROL_URL || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'tasks';
  
  // Return current in-memory state (in production, query DB)
  const state = global.mcState || {
    tasks: [],
    content: [],
    memories: [],
    events: [],
    team: []
  };
  
  return NextResponse.json(state[type] || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, type, data } = body;
  
  // Initialize state if needed
  if (!global.mcState) {
    global.mcState = {
      tasks: [],
      content: [],
      memories: [],
      events: [],
      team: []
    };
  }
  
  if (action === 'add') {
    global.mcState[type] = [...(global.mcState[type] || []), { ...data, id: Date.now().toString() }];
  } else if (action === 'delete') {
    global.mcState[type] = (global.mcState[type] || []).filter((item: any) => item.id !== data.id);
  } else if (action === 'update') {
    global.mcState[type] = (global.mcState[type] || []).map((item: any) => 
      item.id === data.id ? { ...item, ...data } : item
    );
  }
  
  return NextResponse.json({ success: true, state: global.mcState });
}
