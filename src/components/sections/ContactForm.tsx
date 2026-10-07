"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { sendContactEmail } from "@/lib/actions/send-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendContactEmail(data);
      
      if (result?.error) {
        setError(result.error);
      } else {
        setIsSuccess(true);
        reset();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-muted/30 rounded-lg border">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="text-2xl font-bold">Message Sent!</h3>
        <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
        <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-destructive-foreground bg-destructive/90 rounded-md">
          {error}
        </div>
      )}
      
      {/* Honeypot field - hidden from screen readers and visual users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Don&apos;t fill this out if you&apos;re human:</label>
        <input type="text" id="honeypot" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          placeholder="Rakib Hussain" 
          autoComplete="name"
          {...register("name")} 
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="alrokib44@gmail.com" 
          autoComplete="email"
          {...register("email")} 
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          placeholder="How can I help you?" 
          className="min-h-[150px]"
          {...register("message")} 
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
