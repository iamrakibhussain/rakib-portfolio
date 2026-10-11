"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  contactFormSchema,
  ContactFormValues,
  inquiryTypes,
  budgetRanges,
} from "@/lib/validations";
import {
  extractClientIp,
  ipRateLimiter,
  emailRateLimiter,
  generateSecurityToken,
  verifySecurityToken,
  detectMaliciousPayload,
  sanitizeEmailHeader,
  sanitizeInput,
} from "@/lib/security";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactEmail = process.env.CONTACT_EMAIL || "alrokib44@gmail.com";

export type SendEmailResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Generates an HMAC-signed anti-bot session token for the client
 */
export async function getSecuritySessionToken() {
  return generateSecurityToken();
}

/**
 * Fortified server action to handle contact submissions
 */
export async function sendContactEmail(
  rawData: ContactFormValues
): Promise<SendEmailResponse> {
  try {
    // 1. Client IP Extraction & Anti-Abuse Rate Limiting
    const headerStore = await headers();
    const clientIp = extractClientIp(headerStore);

    const ipLimit = ipRateLimiter.check(clientIp);
    if (!ipLimit.allowed) {
      return {
        error: `Security threshold reached: Too many attempts from this IP. Please wait ${ipLimit.retryAfterSec} seconds.`,
      };
    }

    // 2. Honeypot Trap (Silent Bot Trap)
    if (rawData.honeypot && rawData.honeypot.trim().length > 0) {
      return { error: "Security validation rejected submission." };
    }

    // 3. Cryptographic HMAC Anti-Bot Token Verification
    if (rawData.securityToken) {
      const tokenVerification = verifySecurityToken(rawData.securityToken);
      if (!tokenVerification.isValid) {
        return {
          error: tokenVerification.reason || "Bot activity or tampered submission detected.",
        };
      }
    } else {
      return {
        error: "Missing security clearance token. Please refresh the page.",
      };
    }

    // 4. Strict Zod Schema Validation
    const parsed = contactFormSchema.safeParse(rawData);
    if (!parsed.success) {
      const formattedErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString() || "form";
        formattedErrors[fieldName] = issue.message;
      });
      return {
        error: "Please correct the highlighted errors in the form.",
        fieldErrors: formattedErrors,
      };
    }

    const { name, email, inquiryType, budget, subject, message } = parsed.data;

    // 5. Per-Email Flooding Protection
    const normalizedEmail = email.toLowerCase().trim();
    const emailLimit = emailRateLimiter.check(normalizedEmail);
    if (!emailLimit.allowed) {
      return {
        error: "Message limit reached for this email address. Please try again in a few minutes.",
      };
    }

    // 6. Deep Malicious Payload Inspection (XSS, scripts, executable files, SQL injection)
    const messageSecurity = detectMaliciousPayload(message);
    if (messageSecurity.isMalicious) {
      return { error: messageSecurity.reason || "Malicious content pattern detected in message." };
    }

    if (subject) {
      const subjectSecurity = detectMaliciousPayload(subject);
      if (subjectSecurity.isMalicious) {
        return { error: subjectSecurity.reason || "Suspicious content detected in subject." };
      }
    }

    // 7. Sanitization & Email Header Injection (CRLF) Cleansing
    const cleanName = sanitizeEmailHeader(name);
    const cleanEmail = sanitizeEmailHeader(email);
    const cleanSubject = sanitizeEmailHeader(
      subject || `New ${inquiryType} inquiry from ${cleanName}`
    );
    const cleanMessage = sanitizeInput(message);

    const inquiryLabel =
      inquiryTypes.find((t) => t.value === inquiryType)?.label || inquiryType;
    const budgetLabel =
      budgetRanges.find((b) => b.value === budget)?.label || budget;

    // 8. Safe Dispatch via Resend (or Dev Log if API Key not yet configured)
    if (!resend) {
      console.log(
        "[SECURE CONTACT LOG] (RESEND_API_KEY not configured):",
        {
          cleanName,
          cleanEmail,
          inquiryLabel,
          budgetLabel,
          cleanSubject,
          messagePreview: cleanMessage.slice(0, 100),
          clientIp,
          timestamp: new Date().toISOString(),
        }
      );
      return { success: true };
    }

    const { error: sendError } = await resend.emails.send({
      from: "Rakib Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `[Portfolio Inquiry] ${cleanSubject}`,
      text: [
        `From: ${cleanName} (${cleanEmail})`,
        `Inquiry Category: ${inquiryLabel}`,
        `Estimated Budget: ${budgetLabel}`,
        `Origin IP: ${clientIp}`,
        `UTC Timestamp: ${new Date().toUTCString()}`,
        `----------------------------------------`,
        `Message:`,
        cleanMessage,
      ].join("\n"),
    });

    if (sendError) {
      console.error("[Email Dispatch Error]:", sendError.message);
      return {
        error: "Email delivery temporarily paused. Please reach out directly to " + contactEmail,
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[Unhandled Contact Form Error]:", err);
    return {
      error: "An unexpected error occurred while processing your request. Please try again.",
    };
  }
}
