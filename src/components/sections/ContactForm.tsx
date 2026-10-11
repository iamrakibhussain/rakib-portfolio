"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  contactFormSchema,
  ContactFormValues,
  inquiryTypes,
  budgetRanges,
  InquiryTypeValue,
  BudgetRangeValue,
} from "@/lib/validations";
import { sendContactEmail, getSecuritySessionToken } from "@/lib/actions/send-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Send,
  Briefcase,
  Rocket,
  Cpu,
  MessageSquare,
} from "lucide-react";

const inquiryIcons: Record<string, React.ElementType> = {
  project: Briefcase,
  fulltime: Rocket,
  consulting: Cpu,
  general: MessageSquare,
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [securityToken, setSecurityToken] = useState<string>("");

  const fetchToken = async () => {
    try {
      const res = await getSecuritySessionToken();
      if (res?.token) {
        setSecurityToken(res.token);
      }
    } catch {
      // Fallback silently
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "project",
      budget: "not_applicable",
      subject: "",
      message: "",
      honeypot: "",
      securityToken: "",
    },
  });

  const selectedInquiry = watch("inquiryType");
  const selectedBudget = watch("budget");
  const messageContent = watch("message") || "";

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    const payload: ContactFormValues = {
      ...data,
      securityToken,
    };

    try {
      const result = await sendContactEmail(payload);

      if (result?.error) {
        setServerError(result.error);
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, msg]) => {
            setError(field as keyof ContactFormValues, { message: msg });
          });
        }
      } else {
        setIsSuccess(true);
        reset();
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl animate-in fade-in zoom-in-95 duration-300">
        <div className="h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-2xl font-black tracking-tight text-black">
            Inquiry Dispatched Securely!
          </h3>
          <p className="text-black/70 max-w-md text-sm font-medium leading-relaxed">
            Thank you for reaching out! Your message was sanitized, HMAC verified, and delivered directly to Rakib&apos;s primary inbox. You will hear back within 24 hours.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsSuccess(false);
            fetchToken();
          }}
          className="mt-4 rounded-full border-black/20 bg-white hover:bg-black hover:text-white font-bold text-black transition-all cursor-pointer px-6 py-2.5"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 text-sm font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot trap - invisible to human users & screen readers to catch automated bots */}
      <div className="hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="company_fax">Leave this empty if human</label>
        <input
          type="text"
          id="company_fax"
          autoComplete="off"
          tabIndex={-1}
          {...register("honeypot")}
        />
      </div>

      {/* 1. INTERACTIVE INQUIRY CATEGORY PILLS */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <Label className="text-xs font-bold uppercase tracking-wider text-black/70">
            Select Inquiry Category <span className="text-black font-black">*</span>
          </Label>
          <span className="text-[11px] font-semibold text-black/40">Choose one</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {inquiryTypes.map((type) => {
            const isSelected = selectedInquiry === type.value;
            const Icon = inquiryIcons[type.value] || Briefcase;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue("inquiryType", type.value as InquiryTypeValue, { shouldValidate: true })}
                className={`relative p-3.5 rounded-2xl text-left flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-black text-white shadow-lg shadow-black/15 scale-[1.01]"
                    : "bg-white/70 hover:bg-white text-black/80 border border-black/10 hover:border-black/25"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-white/15 text-white" : "bg-black/5 text-black"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate leading-tight">{type.label}</p>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="activeInquiryCheck"
                    className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400"
                  />
                )}
              </button>
            );
          })}
        </div>
        {errors.inquiryType && (
          <p className="text-xs font-semibold text-rose-600">{errors.inquiryType.message}</p>
        )}
      </div>

      {/* 2. INTERACTIVE BUDGET RANGE SELECTOR CHIPS */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <Label className="text-xs font-bold uppercase tracking-wider text-black/70">
            Estimated Budget Range
          </Label>
          <span className="text-[11px] font-semibold text-black/40">Optional</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {budgetRanges.map((b) => {
            const isSelected = selectedBudget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                onClick={() => setValue("budget", b.value as BudgetRangeValue, { shouldValidate: true })}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-black text-white shadow-md shadow-black/15 scale-[1.03]"
                    : "bg-white/70 hover:bg-white text-black/70 border border-black/10 hover:border-black/25"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        {errors.budget && (
          <p className="text-xs font-semibold text-rose-600">{errors.budget.message}</p>
        )}
      </div>

      {/* 3. NAME & EMAIL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-black/70">
            Your Full Name <span className="text-black font-black">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g. Alex Morgan"
            autoComplete="name"
            maxLength={80}
            {...register("name")}
            aria-invalid={!!errors.name}
            className="h-11 rounded-2xl bg-white/80 hover:bg-white focus:bg-white border-black/15 focus:border-black focus:ring-4 focus:ring-black/5 text-sm font-medium text-black placeholder:text-zinc-400 shadow-xs transition-all"
          />
          {errors.name && (
            <p className="text-xs font-semibold text-rose-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-black/70">
            Email Address <span className="text-black font-black">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
            maxLength={120}
            {...register("email")}
            aria-invalid={!!errors.email}
            className="h-11 rounded-2xl bg-white/80 hover:bg-white focus:bg-white border-black/15 focus:border-black focus:ring-4 focus:ring-black/5 text-sm font-medium text-black placeholder:text-zinc-400 shadow-xs transition-all"
          />
          {errors.email && (
            <p className="text-xs font-semibold text-rose-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* 4. SUBJECT FIELD */}
      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-black/70">
          Subject / Headline
        </Label>
        <Input
          id="subject"
          placeholder="Brief summary (e.g. Next.js SaaS MVP Architecture)"
          maxLength={120}
          {...register("subject")}
          aria-invalid={!!errors.subject}
          className="h-11 rounded-2xl bg-white/80 hover:bg-white focus:bg-white border-black/15 focus:border-black focus:ring-4 focus:ring-black/5 text-sm font-medium text-black placeholder:text-zinc-400 shadow-xs transition-all"
        />
        {errors.subject && (
          <p className="text-xs font-semibold text-rose-600">{errors.subject.message}</p>
        )}
      </div>

      {/* 5. MESSAGE FIELD & LIVE CHARACTER COUNTER */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-black/70">
            Project Scope / Message <span className="text-black font-black">*</span>
          </Label>
          <span className="text-[11px] font-mono font-bold text-black/50">
            {messageContent.length} / 2,500 chars
          </span>
        </div>
        <Textarea
          id="message"
          placeholder="Describe your project goals, deliverables, timeline, or engineering challenge in detail..."
          className="min-h-[140px] rounded-2xl bg-white/80 hover:bg-white focus:bg-white border-black/15 focus:border-black focus:ring-4 focus:ring-black/5 text-sm font-medium text-black placeholder:text-zinc-400 shadow-xs transition-all resize-y leading-relaxed"
          maxLength={2500}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-xs font-semibold text-rose-600">{errors.message.message}</p>
        )}
      </div>

      {/* 6. SECURITY BADGE */}
      <div className="flex items-center gap-2 text-xs font-medium text-black/60 pt-1">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>End-to-end sanitized &amp; HMAC cryptographically protected against spam &amp; bots.</span>
      </div>

      {/* 7. SUBMIT BUTTON */}
      <Button
        type="submit"
        className="w-full h-12 bg-black hover:bg-zinc-800 text-white font-bold rounded-2xl cursor-pointer transition-all duration-200 text-sm shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Securing &amp; Transmitting...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 text-white" />
            <span>Send Message Securely</span>
          </>
        )}
      </Button>
    </form>
  );
}
