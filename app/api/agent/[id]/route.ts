import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb'
import Agent from "@/app/models/agents"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { id } = params;

    const agent = await Agent.findById(id);

    if (!agent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: agent });
  } catch (error: any) {
    console.error('Error in GET /api/agents/[id]:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching agent', error: error.message },
      { status: 500 }
    );
  }
}