import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({
  mode: z.string().default('commission'),
  name: z.string().min(1),
  contact: z.string().min(1),
  brief: z.string().min(5),
  trap: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  if (!rateLimit(ip)) return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });

  const data = await req.json().catch(() => null);
  const parsed = schema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ ok: false, error: 'Invalid form' }, { status: 400 });
  if (parsed.data.trap) return NextResponse.json({ ok: true });

  return NextResponse.json({ ok: false, fallback: 'mailto', to: process.env.ORDER_EMAIL_TO || 'mysuzuverse@gmail.com' }, { status: 202 });
}
