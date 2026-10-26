import { trackContactFormSubmit } from "@/lib/gtag";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  interest?: string;
  message: string;
  source?: string;
};

export type ContactResult = {
  ok: boolean;
  delivery?: "email" | "mailto";
  mailto?: string;
  error?: string;
};

export const DIAL_CODES = [
  { flag: "🇮🇳", dial: "+91", country: "India (+91)" },
  { flag: "🇺🇸", dial: "+1", country: "United States (+1)" },
  { flag: "🇬🇧", dial: "+44", country: "United Kingdom (+44)" },
  { flag: "🇦🇪", dial: "+971", country: "UAE (+971)" },
  { flag: "🇸🇬", dial: "+65", country: "Singapore (+65)" },
  { flag: "🇦🇺", dial: "+61", country: "Australia (+61)" },
  { flag: "🇨🇦", dial: "+1", country: "Canada (+1)" },
  { flag: "🇩🇪", dial: "+49", country: "Germany (+49)" },
  { flag: "🇫🇷", dial: "+33", country: "France (+33)" },
  { flag: "🇯🇵", dial: "+81", country: "Japan (+81)" },
  { flag: "🇰🇷", dial: "+82", country: "South Korea (+82)" },
  { flag: "🇸🇦", dial: "+966", country: "Saudi Arabia (+966)" },
  { flag: "🇶🇦", dial: "+974", country: "Qatar (+974)" },
  { flag: "🇿🇦", dial: "+27", country: "South Africa (+27)" },
  { flag: "🇧🇷", dial: "+55", country: "Brazil (+55)" },
] as const;

export const FIND_US_OPTIONS = [
  "Google Search",
  "LinkedIn",
  "Clutch / Review Site",
  "Social Media",
  "Referral",
  "Advertisement",
  "Other",
] as const;

/** Frontend helper around the existing `/api/contact` endpoint. Does not change the API. */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as ContactResult;

  if (!res.ok) {
    throw new Error(data.error || "Failed to send");
  }

  if (data.delivery === "mailto" && data.mailto) {
    window.location.href = data.mailto;
  }

  trackContactFormSubmit();
  return data;
}
