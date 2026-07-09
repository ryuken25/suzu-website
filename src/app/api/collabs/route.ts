import { NextResponse } from 'next/server';
import { getCollabs } from '@/lib/collabs';

export async function GET() {
  return NextResponse.json({ ok: true, collabs: getCollabs() });
}
