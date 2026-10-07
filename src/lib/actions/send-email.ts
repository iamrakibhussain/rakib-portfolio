"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL || "alrokib44@gmail.com";

// Simple in-memory rate limiter.
// LIMITATION: In a serverless environment (e.g., Vercel), memory is not shared across instances.
// This means a distributed attack could technically bypass this limit if requests hit different instances.
// However, this prevents simple bot scripts from abusing a single warm instance.
// For true distributed rate limiting, an external service like Upstash Redis would be required.
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function sendContactEmail(data: ContactFormValues) {
  // 0. Rate limiting check
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip") || "unknown-ip";
  
  const now = Date.now();
  const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  // Reset the window if it's expired
  if (now - rateData.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateData.count = 0;
    rateData.lastReset = now;
  }

  if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
    return { error: "Too many requests. Please try again later." };
  }

  rateData.count += 1;
  rateLimitMap.set(ip, rateData);
  // 1. Validate data on the server
  const parsed = contactFormSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: "Invalid form data provided." };
  }

  // 2. Honeypot check for spam
  if (parsed.data.honeypot) {
    return { error: "Spam detected." };
  }

  const { name, email, message } = parsed.data;

  // 3. Send email using Resend
  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Replace with verified domain in prod
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: "Failed to send message. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Error:", error);
    return { error: "An unexpected error occurred." };
  }
}
