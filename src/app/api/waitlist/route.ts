import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "~/server/db";

const waitlistSchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().max(100).optional(),
  locale: z.string().trim().max(16).optional(),
  source: z.string().trim().max(64).optional(),
});

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = (await request.json()) as unknown;
  } catch {
    body = null;
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 400 },
    );
  }

  const email = normalizeEmail(parsed.data.email);
  const name = parsed.data.name?.trim() ?? null;
  const locale = parsed.data.locale?.trim() ?? null;
  const source = parsed.data.source?.trim() ?? null;

  try {
    const existing = await db.waitlistSignup.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    await db.waitlistSignup.create({
      data: { email, name, locale, source },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Unique race: treat as duplicate success.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    console.error("[waitlist] create failed", error);
    return NextResponse.json(
      { ok: false, error: "server" },
      { status: 500 },
    );
  }
}
