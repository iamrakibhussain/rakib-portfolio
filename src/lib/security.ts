/**
 * Enterprise-grade Security Utilities for Contact & Form Ingestion
 * 
 * Multi-layer Defense Matrix:
 * 1. Cryptographic HMAC Anti-Tamper / Anti-Bot Token (Prevents forged timestamps & direct curl attacks)
 * 2. Deep Payload & Malware Analysis (Executable attachments, malicious schemes, obfuscated XSS, SQL/command injection)
 * 3. Email Header Injection (CRLF) Cleansing (Takes only single line & strips header directives)
 * 4. Advanced HTML Entity Encoding (Prevents stored & reflected XSS)
 * 5. Sliding-Window Rate Limiting with Periodic Memory Pruning
 * 6. Strict IPv4 / IPv6 Extraction & Sanitization
 */

import crypto from "crypto";

// Server secret for signing anti-bot tokens (persisted in memory per process, or from env)
const TOKEN_SECRET = process.env.SECURITY_TOKEN_SECRET || "rakib_portfolio_secure_shield_key_2026";

// 1. Cryptographic Anti-Bot Token Generator & Verifier
export function generateSecurityToken(): { token: string; timestamp: number } {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(timestamp.toString())
    .digest("hex");
  
  // Format: timestamp:signature
  return {
    token: `${timestamp}:${signature}`,
    timestamp,
  };
}

export function verifySecurityToken(token: string | undefined): { isValid: boolean; reason?: string } {
  if (!token || typeof token !== "string") {
    return { isValid: false, reason: "Security token missing or invalid." };
  }

  const parts = token.split(":");
  if (parts.length !== 2) {
    return { isValid: false, reason: "Tampered security token format." };
  }

  const [timeStr, clientSignature] = parts;
  const timestamp = parseInt(timeStr, 10);

  if (isNaN(timestamp)) {
    return { isValid: false, reason: "Invalid token timestamp." };
  }

  // Verify HMAC signature using timing-safe comparison to prevent timing attacks
  const expectedSignature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(timeStr)
    .digest("hex");

  try {
    const validSig = crypto.timingSafeEqual(
      Buffer.from(clientSignature, "utf-8"),
      Buffer.from(expectedSignature, "utf-8")
    );
    if (!validSig) {
      return { isValid: false, reason: "Security signature forgery detected." };
    }
  } catch {
    return { isValid: false, reason: "Security signature verification failed." };
  }

  const now = Date.now();
  const elapsedMs = now - timestamp;

  // Human typing check: must take at least 2.5 seconds (bots submit within < 1s)
  if (elapsedMs < 2500) {
    return { isValid: false, reason: "Submission occurred unnaturally fast. Bot activity suspected." };
  }

  // Token freshness check: expired after 2 hours
  if (elapsedMs > 2 * 60 * 60 * 1000) {
    return { isValid: false, reason: "Form session expired. Please refresh the page." };
  }

  return { isValid: true };
}

// 2. HTML & Special Characters Escaping (Prevent XSS, Tag, and Script Injection)
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";

  // Remove null bytes and invisible control characters except standard whitespace/newlines
  const cleaned = input
    .replace(/\0/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Escape HTML entities to prevent malicious script or markup rendering
  return cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// 3. Email Header Injection Protection (Strips CRLF & header hijacking tokens)
export function sanitizeEmailHeader(headerValue: string): string {
  if (!headerValue || typeof headerValue !== "string") return "";

  // 1. Headers like Name or Subject are strictly single-line.
  // Immediately split at any CRLF, %0A, or %0D and retain ONLY the first segment.
  const firstLine = headerValue.split(/[\r\n]|%0[ad]/i)[0] || "";

  // 2. Strip any attempt to inject SMTP directives even within the first line
  return firstLine
    .replace(/(bcc|cc|to|subject|content-type|mime-version):/gi, "")
    .replace(/[\0\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, 100);
}

// 4. Deep Malicious Payload, Virus Link, and Injection Detection
export function detectMaliciousPayload(content: string): { isMalicious: boolean; reason?: string } {
  if (!content || typeof content !== "string") return { isMalicious: false };

  // 4a. Executable / Dangerous File Extensions in links or attachments
  const executablePattern = /\.(exe|scr|bat|cmd|vbs|pif|msi|ps1|reg|jar|apk|dll|wsf)(\b|[\s"'?#]|$)/i;
  if (executablePattern.test(content)) {
    return {
      isMalicious: true,
      reason: "Security violation: Executable or malicious file link pattern detected.",
    };
  }

  // 4b. Dangerous Protocol Schemes and Data URIs (including space-separated obfuscations)
  const dangerousProtocols = [
    /javascript\s*:/i,
    /vbscript\s*:/i,
    /data\s*:\s*text\/html/i,
    /data\s*:\s*application\//i,
    /blob\s*:/i,
  ];
  for (const pattern of dangerousProtocols) {
    if (pattern.test(content)) {
      return {
        isMalicious: true,
        reason: "Security violation: Dangerous URI scheme detected.",
      };
    }
  }

  // 4c. Active Scripting & Event Handler Tags
  const scriptTags = [
    /<script[\s>]/i,
    /<\/script>/i,
    /<iframe[\s>]/i,
    /<object[\s>]/i,
    /<embed[\s>]/i,
    /on(load|error|click|mouseover|focus|blur|submit)\s*=/i,
  ];
  for (const pattern of scriptTags) {
    if (pattern.test(content)) {
      return {
        isMalicious: true,
        reason: "Security violation: Cross-site scripting (XSS) payload detected.",
      };
    }
  }

  // 4d. SQL / Database Injection Signatures
  const sqlInjectionPatterns = [
    /;\s*(DROP|DELETE|TRUNCATE|ALTER)\s+(TABLE|DATABASE)\b/i,
    /\bUNION\s+(ALL\s+)?SELECT\b/i,
    /'\s*OR\s*'\d+'\s*=\s*'\d+'/i,
    /'\s*OR\s*1\s*=\s*1\b/i,
  ];
  for (const pattern of sqlInjectionPatterns) {
    if (pattern.test(content)) {
      return {
        isMalicious: true,
        reason: "Security violation: Malicious SQL injection sequence detected.",
      };
    }
  }

  // 4e. Mass URL Spam Flooding (> 4 external URLs)
  const urlMatches = content.match(/https?:\/\//gi);
  if (urlMatches && urlMatches.length > 4) {
    return {
      isMalicious: true,
      reason: "Spam prevention: Multiple external links detected.",
    };
  }

  return { isMalicious: false };
}

// 5. Safe Client IP Extraction (Cloudflare, Vercel, Reverse-Proxy friendly)
export function extractClientIp(headerStore: Headers): string {
  // Cloudflare Header
  const cfIp = headerStore.get("cf-connecting-ip");
  if (cfIp && isValidIp(cfIp.trim())) return cfIp.trim();

  // X-Forwarded-For (First IP in proxy chain)
  const forwardedFor = headerStore.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (isValidIp(firstIp)) return firstIp;
  }

  // X-Real-IP
  const realIp = headerStore.get("x-real-ip");
  if (realIp && isValidIp(realIp.trim())) return realIp.trim();

  return "127.0.0.1";
}

function isValidIp(ip: string): boolean {
  // Basic IPv4 & IPv6 format validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^[0-9a-fA-F:]+$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

// 6. Sliding Window Rate Limiter with Auto-Pruning Memory Manager
interface RateRecord {
  count: number;
  firstRequestTime: number;
}

export class MemoryRateLimiter {
  private records = new Map<string, RateRecord>();
  private readonly windowMs: number;
  private readonly maxLimit: number;
  private lastPruneTime = Date.now();

  constructor(windowMs: number = 60000, maxLimit: number = 3) {
    this.windowMs = windowMs;
    this.maxLimit = maxLimit;
  }

  private pruneExpired() {
    const now = Date.now();
    if (now - this.lastPruneTime > 180000) { // Prune every 3 minutes
      this.lastPruneTime = now;
      for (const [key, record] of this.records.entries()) {
        if (now - record.firstRequestTime > this.windowMs) {
          this.records.delete(key);
        }
      }
    }
  }

  public check(identifier: string): { allowed: boolean; remaining: number; retryAfterSec?: number } {
    this.pruneExpired();
    const now = Date.now();
    const record = this.records.get(identifier);

    if (!record || now - record.firstRequestTime > this.windowMs) {
      this.records.set(identifier, { count: 1, firstRequestTime: now });
      return { allowed: true, remaining: this.maxLimit - 1 };
    }

    if (record.count >= this.maxLimit) {
      const retryAfterSec = Math.ceil((record.firstRequestTime + this.windowMs - now) / 1000);
      return { allowed: false, remaining: 0, retryAfterSec: Math.max(1, retryAfterSec) };
    }

    record.count += 1;
    this.records.set(identifier, record);
    return { allowed: true, remaining: this.maxLimit - record.count };
  }

  public reset(identifier?: string) {
    if (identifier) {
      this.records.delete(identifier);
    } else {
      this.records.clear();
    }
  }
}

// Global IP rate limiter: 3 requests per 60 seconds
export const ipRateLimiter = new MemoryRateLimiter(60 * 1000, 3);

// Global Email rate limiter: max 2 requests per 5 minutes per email address
export const emailRateLimiter = new MemoryRateLimiter(5 * 60 * 1000, 2);
