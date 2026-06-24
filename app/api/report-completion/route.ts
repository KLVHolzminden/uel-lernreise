import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    courseId?: unknown;
    courseVersion?: unknown;
    completion?: unknown;
  } | null;

  const courseId = typeof body?.courseId === "string" ? body.courseId : process.env.COURSE_ID ?? "uel-lernreise";
  const courseVersion =
    typeof body?.courseVersion === "string" ? body.courseVersion : process.env.COURSE_VERSION ?? "1.0.0";

  if (body?.completion !== true) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = {
    courseId,
    courseVersion,
    completion: true,
    timestamp: new Date().toISOString(),
  };

  // Datenschutz: Hier werden bewusst keine Namen, Antworten, Punkte, Profile oder Notizen angenommen.
  // TODO: Optional an Vercel KV, Supabase, Neon oder einen datensparsamen Form-/Sheet-Endpoint anbinden.
  console.info("anonymous-course-completion", payload);

  return NextResponse.json({ ok: true });
}
