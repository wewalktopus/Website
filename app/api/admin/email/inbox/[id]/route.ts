import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { getFirebaseAdminDb } from "@/lib/firebase-admin";
import { getResend } from "@/lib/resend";

export const runtime = "nodejs";

function apiKey(): string {
  const k = process.env.RESEND_API_KEY?.trim();
  if (!k) throw new Error("RESEND_API_KEY missing");
  return k;
}

function normalizeEmailList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string").map((entry) => entry.trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

function pickReplyMailbox(receivedTo: string[]): string {
  return receivedTo.find((email) => email.includes("@")) ?? (process.env.RESEND_FROM_EMAIL ?? "hello@walktopus.in");
}

async function fetchReceiving(path: string): Promise<{ ok: boolean; body: Record<string, unknown> }> {
  const resp = await fetch(`https://api.resend.com/emails/receiving/${path}`, {
    headers: { Authorization: `Bearer ${apiKey()}` },
    cache: "no-store",
  });
  const body = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: resp.ok, body };
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const [emailRes, attachRes] = await Promise.allSettled([
      fetchReceiving(id),
      fetchReceiving(`${id}/attachments`),
    ]);
    if (emailRes.status === "rejected" || !emailRes.value.ok) {
      const reason = emailRes.status === "rejected" ? emailRes.reason : emailRes.value.body;
      console.error("[inbox/:id GET]", reason);
      return NextResponse.json({ error: "Failed to load email detail" }, { status: 502 });
    }
    const emailData = emailRes.value.body;
    const attachItems = attachRes.status === "fulfilled" && attachRes.value.ok
      ? ((attachRes.value.body.data as unknown[] | undefined) ?? [])
      : [];
    const toArr = normalizeEmailList(emailData.to);
    const ccArr = normalizeEmailList(emailData.cc);
    return NextResponse.json({
      message: {
        id,
        subject: typeof emailData.subject === "string" ? emailData.subject : "(No subject)",
        from: typeof emailData.from === "string" ? emailData.from : null,
        to: toArr,
        cc: ccArr,
        messageId: typeof emailData.message_id === "string" ? emailData.message_id : null,
        replyFrom: pickReplyMailbox(toArr),
        createdAt: typeof emailData.created_at === "string" ? emailData.created_at : null,
        text: typeof emailData.text === "string" ? emailData.text : "",
        html: typeof emailData.html === "string" ? emailData.html : "",
        attachments: attachItems,
      },
    });
  } catch (error) {
    console.error("[inbox/:id GET]", error);
    return NextResponse.json({ error: "Unable to fetch message details" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role === "viewer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = (await req.json()) as { action?: "reply" | "forward"; message?: string; subject?: string; forwardTo?: string };
  const action = body.action ?? "reply";
  const messageBody = (body.message ?? "").trim();
  if (!messageBody) return NextResponse.json({ error: "Message body is required" }, { status: 400 });
  try {
    const { ok, body: emailData } = await fetchReceiving(id);
    if (!ok) return NextResponse.json({ error: "Could not load original email" }, { status: 502 });
    const originalSubject = typeof emailData.subject === "string" ? emailData.subject : "No subject";
    const fromAddr = typeof emailData.from === "string" ? emailData.from : null;
    const originalMessageId = typeof emailData.message_id === "string" ? emailData.message_id : null;
    const replyMailbox = pickReplyMailbox(normalizeEmailList(emailData.to));
    const walktopusFrom = `Walktopus <${replyMailbox}>`;
    let toAddr: string;
    let finalSubject: string;
    if (action === "forward") {
      const fwdTo = (body.forwardTo ?? "").trim();
      if (!fwdTo || !fwdTo.includes("@")) return NextResponse.json({ error: "Valid forward-to email is required" }, { status: 400 });
      toAddr = fwdTo;
      finalSubject = (body.subject ?? `Fwd: ${originalSubject}`).trim();
    } else {
      if (!fromAddr) return NextResponse.json({ error: "Cannot detect sender to reply to" }, { status: 400 });
      toAddr = fromAddr;
      finalSubject = (body.subject ?? `Re: ${originalSubject}`).trim();
    }
    const htmlBody = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">${messageBody.replace(/\n/g, "<br/>")}</div>`;
    const resend = getResend();
    await resend.emails.send({
      from: walktopusFrom,
      to: toAddr,
      subject: finalSubject,
      html: htmlBody,
      text: messageBody,
      headers: action === "reply" && originalMessageId
        ? {
            "In-Reply-To": originalMessageId,
            References: originalMessageId,
          }
        : undefined,
    });
    const db = getFirebaseAdminDb();
    await db.collection("email_messages").add({
      folder: "sent", subject: finalSubject, body: messageBody, from: walktopusFrom,
      toCount: 1, sampleRecipients: [toAddr], sent: 1, failed: 0, action, inReplyTo: id,
      createdBy: session.uid, createdByEmail: session.email,
      createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[inbox/:id POST]", error);
    return NextResponse.json({ error: `Failed to ${action} email` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role === "viewer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  try {
    const db = getFirebaseAdminDb();
    await db.collection("inbox_deleted").doc(id).set({
      deletedAt: FieldValue.serverTimestamp(),
      deletedBy: session.uid,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[inbox/:id DELETE]", error);
    return NextResponse.json({ error: "Failed to delete email" }, { status: 500 });
  }
}
