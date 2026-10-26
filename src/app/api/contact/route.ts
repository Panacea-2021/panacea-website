import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  interest?: string;
  message?: string;
  source?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "contact@panaceaitservices.com";
  const subject = `[${body.source || "Website"}] Inquiry from ${name}${
    body.interest ? ` — ${body.interest}` : ""
  }`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    body.phone ? `Phone: ${body.country ? `${body.country} ` : ""}${body.phone}` : null,
    body.interest ? `Interest: ${body.interest}` : null,
    "",
    message,
  ].filter(Boolean) as string[];
  const textBody = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Panacea Website <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject,
        text: textBody,
      });
      if (error) {
        return NextResponse.json(
          { error: error.message || "Email provider rejected the message." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true, delivery: "email" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Email send failed";
      return NextResponse.json({ error: msg }, { status: 502 });
    }
  }

  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;
  return NextResponse.json({
    ok: true,
    delivery: "mailto",
    mailto,
  });
}
