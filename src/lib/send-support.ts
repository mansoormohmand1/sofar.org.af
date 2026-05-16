import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export const sendSupportMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const data = d as { name: string; email: string; help: string };
    if (!data.name?.trim() || !data.email?.trim() || !data.email.includes("@")) {
      throw new Error("Invalid form data");
    }
    return { name: data.name.trim(), email: data.email.trim(), help: data.help || "Not specified" };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);

    const html = `
      <h2>New Message of Support</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
        <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border:1px solid #d1d5db;">Name</td><td style="padding:8px 12px;border:1px solid #d1d5db;">${data.name}</td></tr>
        <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border:1px solid #d1d5db;">Email</td><td style="padding:8px 12px;border:1px solid #d1d5db;">${data.email}</td></tr>
        <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border:1px solid #d1d5db;">How to help</td><td style="padding:8px 12px;border:1px solid #d1d5db;">${data.help}</td></tr>
      </table>
      <p style="color:#6b7280;font-size:12px;margin-top:24px;">Sent via SOFAR website support form</p>
    `;

    const { error } = await resend.emails.send({
      from: "SOFAR Website <onboarding@resend.dev>",
      to: ["sofar.org.af@gmail.com", "info@sofar.org.af"],
      subject: `Message of Support from ${data.name}`,
      html,
      replyTo: data.email,
    });

    if (error) throw new Error(error.message);
    return { success: true };
  });
