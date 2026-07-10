import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { createCmsOrder } from '@/lib/cms-orders';
import { sendTransactionalEmail, orderEmailText } from '@/lib/mailer';
import { ADMIN_EMAIL } from '@/lib/server-env';

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

  const persisted = await createCmsOrder({
    mode: parsed.data.mode,
    name: parsed.data.name,
    contact: parsed.data.contact,
    brief: parsed.data.brief,
    package_slug: parsed.data.mode,
    source: 'contact-api',
  });
  if (persisted.ok && persisted.persisted && persisted.order && ADMIN_EMAIL) {
    await sendTransactionalEmail({
      orderId: persisted.order.id,
      type: 'contact_created_creator',
      to: ADMIN_EMAIL,
      subject: `New Suzu inquiry — ${persisted.order.public_id}`,
      text: orderEmailText(persisted.order.public_id),
    });
  }

  return NextResponse.json({ ok: false, fallback: 'mailto', to: process.env.ORDER_EMAIL_TO || 'mysuzuverse@gmail.com', order: persisted.ok ? { persisted: persisted.persisted, publicId: persisted.order?.public_id || persisted.publicId || '' } : { persisted: false } }, { status: 202 });
}
